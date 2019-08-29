# PostDataToGoogleAppScript
Send POST data from application to Google App Script and processed to Google Sheet<br>

Proof of concept for Sending POST data from web to a Google sheet Receives POST data from Web application (postToGAS.php) and saves the headers into the first row and the data into subsequent rows.<br>

The headers do not need to be known ahead of time

The script must be tied to a sheet (it cannot be a stand alone script) and script must be authorized prior to being used.<br>

The script must be published as a web app with the published script URL being called in the CURL request. The permissions need to be: Execute the app as: Me <br>
Who has access to the App: Everyone, even anonomous<br>

The incoming JSON data shoult be in the following format: {"data": [ { "Key1":"value", "key2":"value", ... "KeyN":"value" }, { "Key1":"value", "key2":"value", ... "KeyN":"value" } ] }
