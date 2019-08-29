/*********
* Proof of concept
* Receives POST data from Web application
* and saves the headers into the first row
* and the data into subsequent rows.
* The headers do not need to be known ahead of time
*
* The script must be tied to a sheet (it cannot be a stand alone script)
* and the script must be authorized prior to being used.
* 
* The script must be published as a web app with the published script URL
* being called in the CURL request.  The permissions need to be:
* Execute the app as: Me
* Who has access to the App: Everyone, even anonomous
*
* The incoming JSON data shoult be in the following format:
{"data":
  [
     {
       "Key1":"value",
       "key2":"value",
       ...
       "KeyN":"value"
     },
     {
        "Key1":"value",
        "key2":"value",
        ...
        "KeyN":"value" 
      }
   ]
}
   
***********/



/*******
** this function name is reserved by GAS 
** it is reserved to automatically receive
** POST calls
********/
function doPost(e){
  //get the spreadsheet and sheet tied to script
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Data");
  
  //this is the contents of the post in JSON
  var postContents = e.postData.contents;
  
  //the data being processed
  var data = JSON.parse(postContents).data;
  
  //clears the sheet before the initial adding of information
  sheet.clear();
  
  //gets the headers from the incoming data 
  var headerRow = Object.keys(data);
  //saves the keys from the data portion of the JSON into an 1d array
  var keys = Object.keys(data[headerRow[0]]);
 //tun 1D array into 2D array [[key1, key2,...keyn]] which is required by setvalues()
  var headers = morphIntoMatrix(keys);
  
  //sets header range to first row, first column and extending into the first row for the length of keys
  var range = sheet.getRange(1, 1, 1, keys.length)
  //copies key values to first row of sheet
  range.setValues(headers);
  
  //copied rest of data into sheet
  for (i in data){
    var nextRow = sheet.getLastRow()+1;
    
    var values=[];
    for (var k=0; k<keys.length;k++){
      var range = sheet.getRange(nextRow, k+1, 1, 1);
      range.setValue(data[i][keys[k]]);
    }
  }
}
//set up a custom menu so that script can be activated by user
function onOpen() {
  var menu = [{name: 'Activate Script', functionName: 'activateMyScript'}];
  SpreadsheetApp.getActive().addMenu('Scripts', menu);
}

/** 
  * Activate Script button must be called first because the 
  * doGet() function uses Oauth and permissions 
  * dialog will not come up when the "doGet()" 
  * is run with a POST request
  **/
function activateMyScript(){
  Browser.msgBox('Script has been activated!');
}
// Morphs a 1-d array into a 2-d array for use with Range.setValues([][])
function morphIntoMatrix(array) {

  // Create a new array and set the first row of that array to be the original array
  // This is a sloppy workaround to "morphing" a 1-d array into a 2-d array
  var matrix = new Array();
  matrix[0] = array;

  // "Sanitize" the array by erasing null/"null" values with an empty string ""
  for (var i = 0; i < matrix.length; i ++) {
    for (var j = 0; j < matrix[i].length; j ++) {
      if (matrix[i][j] == null || matrix[i][j] == "null") {
        matrix[i][j] = "";
      }
    }
  }
  return matrix;
}
