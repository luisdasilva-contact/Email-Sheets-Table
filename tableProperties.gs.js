/*
 * Module used to retrieve properties related to the table the user will send 
      out. Contains the following functions: 
 * @return {function} getTableValues Retrieves the selected values as a 2D 
      array. If nothing is selected, returns null.
 * @return {function} getHeaderValues Retrieves the values in the first row of 
      table values.
 */
var tableProperties = (function() {
  /*
   * Retrieves the selected values as a 2D array. If nothing is selected, 
        returns null.
   * @return {?Array<string>} 2D array of values from the selected range in the 
        spreadsheet. Null if nothing is selected.
   */
  function getTableValues() {
    var currentlySelectedRange = SpreadsheetApp.getActiveSpreadsheet()
      .getActiveSheet().getSelection().getActiveRange();
    var currentlySelectedRangeValues = currentlySelectedRange.getValues();

    return ((currentlySelectedRangeValues) ? currentlySelectedRangeValues :
      null);
  };

  /*
   * Retrieves the values in the first row of table values.
   * @return {Array<string>} the values in the first row of table values.
   */
  function getHeaderValues() {
    var tableValues = getTableValues();
    var headerValues = [];

    for (var tableValue in tableValues){
      return tableValues[tableValue][0];
    };
  };

  return {
    getTableValues: getTableValues,
    getHeaderValues: getHeaderValues
  };
})();