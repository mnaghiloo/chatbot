# Gemini AI Chatbot

A simple web-based chatbot using Google's Gemini AI API.

## Features

- Clean, modern interface
- Real-time AI responses
- Simple and easy to use

## How to Run

1. Clone or download this repository
2. Open the `index.html` file in your web browser
   - You can double-click the file to open it
   - Or use a local development server

## Troubleshooting

If you're seeing the error "Sorry, I encountered an error. Please try again." or other API issues:

1. **Check your browser console** for detailed error messages (F12 → Console tab)
2. **CORS issues**: The API might be blocked due to CORS policies when running locally. Try:
   - Running the app on a local server (using tools like Live Server VS Code extension)
   - Opening `offline.html` to see a demo version that doesn't require API calls
3. **API key issues**: 
   - Make sure the API key is valid
   - The key might have usage limitations or rate limits
   - You might need to enable the Gemini API in a Google Cloud project

## Usage

1. Type your message in the input box
2. Press Enter or click the Send button
3. Wait for the AI to respond

## Recommended Setup

For the best experience, it's recommended to:

1. Install a local server tool like [Live Server for VS Code](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) or [http-server](https://www.npmjs.com/package/http-server)
2. Run the application through the server rather than opening the file directly

## Technologies Used

- HTML
- CSS
- JavaScript
- Google Gemini API 