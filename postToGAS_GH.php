<?php
	
	//url to the Google script running the POST request
	$url = "https://script.google.com/YOUR_GOOGLE_SCRIPT_URL/exec";
	$ch = curl_init($url);
	
	//sample data.  Data should be in this format as an object
	$data = array([
    	'Name' => 'Bob',
		'Color' => 'Blue',
		'Birth Month' => 'December'],
		[
		'Name' => 'Tracy',
		'Color' => 'Black',
		'Birth Month' => 'October'
		], 
		[
		'Name' => 'Sean',
		'Color' => 'Purple',
		'Birth Month' => 'April'
		],
		[
		'Name' => 'Morgan',
		'Color' => 'Yellow',
		'Birth Month' => 'March'
		
		],
		[
		'Name' => 'Jack',
		'Color' => 'White',
		'Birth Month' => 'Feb'
		]
	);
	//save array in JSON
	$payload = json_encode(array("data" => $data));
	//attach encoded JSON string to the POST fields
	curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
	//set the content type to application/json
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
	//return response instead of outputting
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		
	//Tell cURL that it should follow any redirects.  this is required because google does weird shit with a redirect when POSTing data
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
	//execute the POST request
	$result = curl_exec($ch);
	$resultType = gettype($result);
	//the results come back as HTML 
	print "The results of the curl were ".$result;

	//close cURL resource
	curl_close($ch);
    
   
?>