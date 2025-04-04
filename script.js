// Gemini API key
const API_KEY = 'AIzaSyAkk8zsiseRhrh3uSUdeCaviMXRdbrd0Xk';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// DOM elements
const chatMessages = document.getElementById('chat-messages');
const messageForm = document.getElementById('message-form');
const userInput = document.getElementById('user-input');

// Add initial status message with API status check
(async function() {
    const statusMessage = addMessageToChat('bot', 'Checking API connection...');
    
    try {
        // Make a test API call
        await testApiConnection();
        statusMessage.querySelector('p').textContent = 'Hello! I\'m your AI assistant. How can I help you today?';
    } catch (error) {
        console.error('Initial API check failed:', error);
        statusMessage.querySelector('p').textContent = 'Error connecting to the AI service. Please check the console for details.';
    }
})();

// Event listener for form submission
messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const message = userInput.value.trim();
    if (!message) return;
    
    // Add user message to chat
    addMessageToChat('user', message);
    
    // Clear input field
    userInput.value = '';
    
    // Show loading indicator
    const loadingElement = addMessageToChat('bot', 'Thinking...');
    
    try {
        // Get response from Gemini API
        const response = await getGeminiResponse(message);
        
        // Update bot message with response
        loadingElement.querySelector('p').textContent = response;
    } catch (error) {
        // Update bot message with error and show detailed error in console
        loadingElement.querySelector('p').textContent = `Error: ${error.message}`;
        console.error('Error details:', error);
    }
});

// Function to test API connection
async function testApiConnection() {
    try {
        const testMessage = "Hello";
        await getGeminiResponse(testMessage, true);
        return true;
    } catch (error) {
        throw error;
    }
}

// Function to add a message to the chat
function addMessageToChat(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    
    const messageText = document.createElement('p');
    messageText.textContent = message;
    
    messageElement.appendChild(messageText);
    chatMessages.appendChild(messageElement);
    
    // Scroll to the bottom of the chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return messageElement;
}

// Function to get response from Gemini API
async function getGeminiResponse(message, isTest = false) {
    try {
        const requestBody = {
            contents: [{
                parts: [{
                    text: message
                }]
            }]
        };
        
        if (!isTest) {
            console.log('Sending request to Gemini API:', requestBody);
        }
        
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        
        const responseText = await response.text();
        
        // Try to parse the response as JSON
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            console.error('Failed to parse API response as JSON:', responseText);
            throw new Error('Invalid API response format');
        }
        
        if (!response.ok) {
            const errorMessage = data.error ? `${data.error.message} (${data.error.code})` : `HTTP error ${response.status}`;
            console.error('API Response Error:', errorMessage, data);
            throw new Error(errorMessage);
        }
        
        if (!isTest) {
            console.log('API Response:', data);
        }
        
        // Extract the text from the response
        if (data.candidates && 
            data.candidates[0] && 
            data.candidates[0].content && 
            data.candidates[0].content.parts && 
            data.candidates[0].content.parts[0] && 
            data.candidates[0].content.parts[0].text) {
            return data.candidates[0].content.parts[0].text;
        } else {
            console.error('Unexpected API response structure:', data);
            throw new Error('Unexpected response structure from API');
        }
    } catch (error) {
        console.error('Error in getGeminiResponse:', error);
        throw error;
    }
} 