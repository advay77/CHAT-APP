const socket = io(); 

const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const usernameInput = document.getElementById('username-input');
const joinButton = document.getElementById('join-button');
const chatContainer = document.getElementById('chat-container');
const namePrompt = document.getElementById('name-prompt');

let username = '';


joinButton.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username) {
        namePrompt.style.display = 'none';
        chatContainer.style.display = 'block';
    }
});

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message && username) {
        socket.emit('chatMessage', { username, message }); 
        messageInput.value = ''; 
    }
});
socket.on('chatMessage', ({ username, message }) => {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${username}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; 
});
