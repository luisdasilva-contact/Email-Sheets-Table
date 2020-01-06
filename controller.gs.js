/*
 * controller object to act as a mediator between the UI and user-stored 
      properties.
 * @return {function} setContent Sets the user's entered content as a property 
      via Google's Properties Service, dependant upon an entered enum. 
 * @return {function} clearAllProperties Deletes all of the document's
      properties related to this application.
 */
var controller = (function() {
  /*
   * Sets the user's entered content as a property via Google's Properties 
        Service, dependant upon an entered enum. 
   * @param {string} The value that will be set as a property in the Properties 
        Service.
   */
  function setContent(enum) {
    switch (enum) {
      case ('EMAILS'):
        var currentEmailList = emailProperties.getEmails();
        var UiPromptString =
          'Please enter a list of comma-separated emails, or a single email, ' +
          'that will receive the table you send. ';
        var existingListPrepend = 'The existing list is as follows: \n' +
          currentEmailList;
        var propertyToSet = 'EMAILS';

        if (currentEmailList) {
          UiPromptString = UiPromptString + existingListPrepend;
        };

        setEmails(UiPromptString, propertyToSet);
        break;
      case ('CC'):
        var currentCCList = emailProperties.getCC();
        var UiPromptString =
          'Please enter a list of comma-separated emails, or a single email, ' + 
          'that will be CC\'d with the table you send. ';
        var existingListPrepend = 'The existing list is as follows: \n' +
          currentCCList;
        var propertyToSet = 'CC';

        if (currentCCList) {
          UiPromptString += existingListPrepend;
        };

        setEmails(UiPromptString, propertyToSet);
        break;
      case ('SUBJECT'):
        var currentSubject = emailProperties.getSubject();
        var UiPromptString =
          'Please enter the subject line for the email you will send. ';
        var existingListPrepend = 'The existing subject is as follows: \n' +
          currentSubject;
        var propertyToSet = 'SUBJECT';

        if (currentSubject) {
          UiPromptString += existingListPrepend;
        };

        setText(UiPromptString, propertyToSet);
        break;
      case ('BODYTEXT'):
        var currentBodyText = emailProperties.getBodyText();
        var UiPromptString =
          'Please enter the body text you\'d like to prepend the chart with. ';
        var existingListPrepend =
          'The existing body text is as follows: \n' + currentBodyText;
        var propertyToSet = 'BODYTEXT';

        if (currentBodyText) {
          UiPromptString += existingListPrepend;
        };

        setText(UiPromptString, propertyToSet);
        break;
    };
  };

  /*
   * Sets any properties related to emails. Includes regex check for valid list 
        of emails.
   * @param {string} UiPromptString The string that will be displayed to the 
        user in the window prompting them to enter a list of emails.
   * @param {string} propertyToSet The property that will be set via Properties 
        Service.
   */
  function setEmails(UiPromptString, propertyToSet) {
    const EMAIL_REGEX = /[a-zA-Z0-9._%-]+@[a-zA-Z\d\-]+./;
    var setEmailsWindowResponse = UiFunctions.displayPrompt(UiPromptString);

    if (setEmailsWindowResponse) {
      var emailsSplit = setEmailsWindowResponse.split(",");
      var validResponse = true;
      const ERROR_TEXT = 'Error! This email is not valid: ';

      for (var email in emailsSplit){
        if (!EMAIL_REGEX.test(emailsSplit[email])){
          UiFunctions.displayAlert(ERROR_TEXT + emailsSplit[email]);
          validResponse = false;
          break;
        };  
      };


      if (validResponse) {
        emailProperties.setProperty(propertyToSet, setEmailsWindowResponse);
      };
    };
  };

  /*
   * Sets any properties related to text.
   * @param {string} UiPromptString The string that will be displayed to the 
        user in the window, prompting them to enter text.
   * @param {string} propertyToSet The property that will be set via Properties 
        Service.
   */
  function setText(UiPromptString, propertyToSet) {
    var setSubjectWindowResponse = UiFunctions.displayPrompt(
    UiPromptString);
    if (setSubjectWindowResponse) {
      emailProperties.setProperty(propertyToSet, setSubjectWindowResponse);
    };
  }

  /*
   * Deletes all of the document's properties related to this application.
   */
  function clearAllProperties() {
    PropertiesService.getDocumentProperties().deleteAllProperties();
  }

  return {
    setContent: setContent,
    clearAllProperties: clearAllProperties
  };
})();