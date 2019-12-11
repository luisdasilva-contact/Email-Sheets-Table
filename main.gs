/*
 * Evaluates the given 2D array, ensuring there are at least 2 rows and 2 columns.
 * @param {Array<string>} tableValues The 2D array to analyze for at least 2 rows and 2 columns.
 * @return {boolean} Whether or not the 2D array is a valid representation of a chart with at least 2 rows and 2 columns.
 */
function evaluateSelectionForValidChart(tableValues){
    if (tableValues.length === 1 && tableValues[0].length === 1){
            UIFunctions.displayAlert("You must select your values that you'd like to send in a chart!");
            return false;
    } else if (tableValues.length === 1 && tableValues[0].length >= 1) {
          UIFunctions.displayAlert("You must select more than one row!");
          return false;    
    } else if (tableValues.length >= 1 && tableValues[0].length === 1) {
          UIFunctions.displayAlert("You must select more than one column!");
          return false;
    };
    
    return true;
};

/*
 * Sends the currently-selected range as a chart in an email. Includes validation for a valid chart and list of emails.
 */
function sendTable(){
    var tableValues = tableProperties.getTableValues();
    
    if (!evaluateSelectionForValidChart(tableValues)){
        return;
    };
    
    var isHeader = UIFunctions.displayYesNoChoice("Does this table have a header?");
       
    if (isHeader === "YES"){
        var header = tableProperties.getHeaderValues();
        var htmlTable = getHTMLTable(tableValues, header);
    } else if (isHeader === "NO") {
        var htmlTable = getHTMLTable(tableValues);    
    } else {
        return;
    };
    
    try {
        var bodyText = emailProperties.getBodyText();
    
        if (!bodyText){
            bodyText = "";        
        }
        
        sendEmails(htmlTable, emailProperties.getEmails(), emailProperties.getCC(), emailProperties.getSubject(), 
                   bodyText);
    } catch(error){
        UIFunctions.displayAlert("Encountered an error! Please ensure that addresses in Emails and CC are valid.")
    };
};

/*
 * Given a 2D array, creates an HTML representation as a table.
 * @param {Array<string>} tableValues 2D array of values that will be built as a chart.
 * @param {boolean} header Whether or not the first row is a header, in which case, it will be bolded in the HTML table.
 * @return {string} HTML string of the table. 
 */
function getHTMLTable(tableValues, header) {
    var html = "<style>table,td{border: 1px solid black; }</style><table style=\"width:100%;border: 1px solid black;border-collapse: collapse\">";
        
    for (var row = 0; row < tableValues.length; row++) {
        html += "<tr>";
        for (var column = 0; column < tableValues[row].length; column++) {
            if (header && row === 0) {
                html += "<th style=\"border: 1px solid black;\"><b>" + tableValues[row][column] + "</b></th>";
            } else {
                html += "<td style=\"border: 1px solid black;\">" + tableValues[row][column] + "</td>";
            };
        };
        html += "</tr>";
    };    
    html += "</table>";
    return html;
};

/* 
 * Sends an email with given parameters.
 * @param {string} htmlTable HTML string of the table.
 * @param {Array<string>} emails List of emails to send the table to.  
 * @param {?Array<string>} cc List of emails to cc with the table.
 * @param {?string} subject The subject line for the email.
 * @param {?string} body Body text to prepend the email with.
 */
function sendEmails(htmlTable, emails, cc, subject, body) {
    MailApp.sendEmail(emails, subject, null, {htmlBody: body + htmlTable, cc: cc});
};
