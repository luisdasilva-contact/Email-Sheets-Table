/*
 * Module used to display content via Google Apps Script's built-in UI features. Contains the following functions: 
 * @return {function} displayAlert Displays a window with text to the user.
 * @return {function} displayPrompt Displays a text field to the user, allowing them to submit text, or cancel.
 * @return {function} displayYesNoChoice Displays a window with text to the user, allowing them to select "YES", "NO", or "CANCEL".
 * @return {function} displayHTMLAlert Displays a window with text to the user, taking HTML content.
 */ 
var UIFunctions = (function(){
    var UI = SpreadsheetApp.getUi();
    
    /*
     * Displays a window with text to the user.
     * @param {string} alertText The text to display to the user.
     */
    function displayAlert(alertText){
        UI.alert(alertText);
    };
    
    /*
     * Displays a text field to the user, allowing them to submit text, or cancel.
     * @param {string} promptText The text to display to the user above the text field.
     * @return {?string} The text the user has entered if they clicked "OK". Null if "CANCEL" is clicked.
     */
    function displayPrompt(promptText){
        var prompt = UI.prompt(promptText);
        
        if (prompt.getSelectedButton() === UI.Button.OK){
            return prompt.getResponseText();
        } else {
            return null;
        };
    };
    
    /*
     * Displays a window with text to the user, allowing them to select "YES", "NO", or "CANCEL".
     * @param {string} promptText The text to display to the user above the "YES", "NO", and "CANCEL" buttons.
     * @return {?string} The user's choice. "YES" if they clicked "YES", "NO" if they clicked "NO", null if they clicked "CANCEL".
     */
    function displayYesNoChoice(promptText){
        var prompt = UI.alert(promptText, UI.ButtonSet.YES_NO_CANCEL);
        
        if (prompt === UI.Button.YES){
          return "YES";
        } else if (prompt === UI.Button.NO){
          return "NO";
        } else {
          return null;
        };
    };
    
    /*
     * Displays a window with text to the user, taking HTML content.
     * @param {string} HTML content to display in the window.
     * @param {string} title The text to display as the window's title.
     */
    function displayHTMLAlert(htmlOutput, title){
        UI.showModelessDialog(htmlOutput, title);            
    };
  
    return {
        getUI: UI,
        displayPrompt: displayPrompt,
        displayAlert: displayAlert,
        displayYesNoChoice: displayYesNoChoice,
        displayHTMLAlert: displayHTMLAlert
  };
})();

/*
 * HTML text to display to the user, showing them how to navigate the program. 
 * @return {string} HTML to display in the window the user will see upon clicking the Help button.
 */
function helpText(){
  return "<html><head><link rel='stylesheet' href='https://ssl.gstatic.com/docs/script/css/add-ons1.css'></head>" +
         "This app is used to email the user's current selection of cells in Google Sheets as a table. The values " + 
         "that the user sets for emails, CC emails, the subject line, and the text to prepend to the table persist " +
         "after the document is closed, allowing a user to frequently send out emails with updated tables, minimizing " +
         "time spent on the repetitive task of repeatedly entering emails, subject lines, etc. The text below outlines " +
         "each of this app's functions.<br><br>" +
         "Send Table: Send the selected cells as a chart. The email's properties are dependant upon the " +
         "user's input in 'Edit Email Properties'.<br><br>" +
         "Edit Email Properties:<br>" +
         "&nbsp;&nbsp;>&nbsp;&nbsp;Set Emails: Enter a list of comma-separated emails that will receive the email you send.<br>" +
         "&nbsp;&nbsp;>&nbsp;&nbsp;Set CC: Enter a list of comma-separated emails that will be CC'd with the email you send.<br>" +
         "&nbsp;&nbsp;>&nbsp;&nbsp;Set Subject: Enter the text that will be used as the subject line in the email you send.<br>" +
         "&nbsp;&nbsp;>&nbsp;&nbsp;Set Body Text: Enter the body text that will prepend the table in the email you send.<br>" +
         "&nbsp;&nbsp;>&nbsp;&nbsp;Clear All Properties: Clear all user-entered properties." +
         "</font></body></html>";
};

/*
 * Function placed in UI to activate method to display HTML content in a window. 
 */
function helpButton(){
    var htmlOutput = HtmlService.createHtmlOutput(helpText())
                                .setWidth(700)
                                .setHeight(300);
    UIFunctions.displayHTMLAlert(htmlOutput, "Help");
};

/*
 * Function placed in UI to activate method to set email list. 
 */
function setEmails(){
    controller.setContent(emailProperties.getEnums().EMAILS);
};

/*
 * Function placed in UI to activate method to set CC list. 
 */
function setCC(){
    controller.setContent(emailProperties.getEnums().CC);
}

/*
 * Function placed in UI to activate method to set subject. 
 */
function setSubject(){
    controller.setContent(emailProperties.getEnums().SUBJECT);
};

/*
 * Function placed in UI to activate method to set body text. 
 */
function setBodyText(){
    controller.setContent(emailProperties.getEnums().BODYTEXT);
};

function clearAllProperties(){
    controller.clearAllProperties();
};

/*
 * Function to automatically build menu upon opening the document.
 * @param {Event} onOpen event containing context regarding the document upon opening.
 */
function onOpen(e){
    UIFunctions.getUI
        .createMenu("Email Table")
        .addItem("Send Table", "sendTable")
        .addSubMenu(UIFunctions.getUI.createMenu("Edit Email Properties")
            .addItem("Set Emails", "setEmails")
            .addItem("Set CC", "setCC")
            .addItem("Set Subject", "setSubject")
            .addItem("Set Body Text", "setBodyText")
            .addItem("Clear All Properties", "clearAllProperties"))
        .addSeparator()
        .addItem("Help", "helpButton")
        .addToUi();
};
