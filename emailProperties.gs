/*
 * Module used to retrieve properties related to the email the user will send out. Contains the following functions: 
 * @return {function} getEmails Retrieves the string of emails as a comma-separated array. 
   If the string cannot be parsed as such, null is returned.
 * @return {function} getCC Retrieves the string of CC emails as a comma-separated array. If the string cannot 
   be parsed as such, null is returned.
 * @return {function} getSubject Gets the subject string. If there is no string, or it can't be returned, null is returned.
 * @return {function} getBodyText Gets the body text string. If there is no body text, or it can't be returned, null is returned.
 * @return {function} setProperty Sets the given property with the given userInput as a value.
 * @return {function} Retrieves an enum object for emailProperties.
 */ 
var emailProperties = (function() {  
    var properties = PropertiesService.getDocumentProperties();
    var emailListPropertyName = "EMAILS";
    var ccPropertyName = "CC";
    var subjectPropertyName = "SUBJECT";
    var bodyTextPropertyName = "BODYTEXT";
    var emailList = properties.getProperty(emailListPropertyName);
    var cc = properties.getProperty(ccPropertyName);
    var subject = properties.getProperty(subjectPropertyName);
    var bodyText = properties.getProperty(bodyTextPropertyName);
    
    /*
     * Retrieves the string of emails as a comma-separated array. If the string cannot be parsed as such, null is returned.
     * @return {?array<string>} String array of emails. If string can't be split by comma, null is returned.
     */
    function getEmails(){
        try {            
            return emailList.split(",");
        } catch (error){
            return null;
        };
    };
    
    /*
     * Retrieves the string of CC emails as a comma-separated array. If the string cannot be parsed as such, null is returned.
     * @return {?array<string>} String array of emails. If string can't be split by comma, null is returned.
     */
    function getCC(){
        try {            
            return cc;
        } catch (error){
            return null;
        };
    };
    
    /*
     * Gets the subject string. If there is no string, or it can't be returned, null is returned.
     * @return {?string} Subject string. If it can't be returned, null is returned.
     */
    function getSubject(){
        try {            
            return subject;
        } catch (error){
            return null;
        };
    };
    
    /*
     * Gets the body text string. If there is no body text, or it can't be returned, null is returned.
     * @return {?string} Body text string. If it can't be returned, null is returned.
     */
    function getBodyText(){
        try {
            return bodyText;
        } catch (error){
            return null;
        };
    };
        
    /*
     * Sets the given property with the given userInput as a value.
     * @param {string} property The property that will be set in Google's Property Service (the "key").
     * @param {string} userInput The value that will be set in Google's Property Service (the "value").
     */
    function setProperty(property, userInput){
        properties.setProperty(property, userInput);  
    };
    
    /*
     * Retrieves an enum object for emailProperties.
     * @return {object} Container of enum strings. Enum values are EMAILS, SUBJECT, BODYTEXT, CC.
     */
    function getEnums(){
      var EmailEnums = Object.freeze({EMAILS: "EMAILS", 
                                      SUBJECT: "SUBJECT",
                                      BODYTEXT: "BODYTEXT",
                                      CC: "CC"});
      return EmailEnums;
    };
  
    return {
        getEmails: getEmails,
        getCC: getCC,
        getSubject: getSubject,
        getBodyText: getBodyText,        
        setProperty: setProperty,
        getEnums: getEnums,
    };  
})();

