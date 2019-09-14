/* These values are user-defined.*/
var tableRange = "Enter the table's range in A1 notation here.";
var header = true; // Mark 'true' if the table has a header for each column, and 'false' if it does not.
var sheetName = "Enter the title of the sheet the table is on here.";
var recipients = "Enter recipients emails, separated by commas; i.e. luisdasilva.animation@gmail.com, luisdasilva.contact@gmail.com";
var subject = "Subject test";
var emailMessage = "Enter the text that will precede the table in the email here.";
var cc = "Enter recipients who would be cc'd here; if there are none, leave this string empty.";

var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
var tableValues = sheet.getRange(tableRange).getValues();


/* Gets an HTML table from the given array.*/
function getHTMLTable() {
    var html = "<style>table,td{border: 1px solid black; }</style><table style=\"width:100%;border: 1px solid black;border-collapse: collapse\">";

    for (var row = 0; row < tableValues.length; row++) {
        html += "<tr>";
        for (var column = 0; column < tableValues[row].length; column++) {
            if (header === true && row === 0) {
                console.log("entering header row")
                html += "<th style=\"border: 1px solid black;\"><b>" + tableValues[row][column] + "</b></th>";
            } else {
                html += "<td style=\"border: 1px solid black;\">" + tableValues[row][column] + "</td>";
            }

        }
        html += "</tr>";
    }
    
    html += "</table>";
    return html;
}

/* Sends an email with paramters from the user's defined variables above.*/
function sendEmails() {
    var body = getHTMLTable();
    MailApp.sendEmail(recipients, subject, null, {htmlBody: body, cc: cc});
}
