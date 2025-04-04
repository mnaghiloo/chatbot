<?php
// Set CORS headers to allow requests from any origin
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// If it's an OPTIONS request, just return with headers (pre-flight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Get the API key from the request
$api_key = isset($_GET['key']) ? $_GET['key'] : '';

if (empty($api_key)) {
    echo json_encode(['error' => 'API key is required']);
    exit(1);
}

// Get the request body
$request_body = file_get_contents('php://input');

// Set up the Gemini API URL
$api_url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' . $api_key;

// Initialize cURL
$ch = curl_init($api_url);

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $request_body);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);

// Execute cURL and get the response
$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Check for cURL errors
if (curl_errno($ch)) {
    echo json_encode(['error' => 'cURL error: ' . curl_error($ch)]);
    exit(1);
}

// Close cURL
curl_close($ch);

// Set the HTTP status code to match the API response
http_response_code($http_code);

// Return the API response
echo $response;
?> 