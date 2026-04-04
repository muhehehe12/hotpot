// script.js

// 1. Mobile Menu Toggle
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// 2. Chatbox Logic
const chatLauncher = document.getElementById('chat-launcher');
const chatboxContainer = document.getElementById('chatbox-container');
const closeChatBtn = document.getElementById('chatbox-toggle');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const chatBody = document.getElementById('chatbox-body');

// Toggle chatbox visibility
chatLauncher.addEventListener('click', () => {
    chatboxContainer.classList.add('active');
    chatLauncher.style.display = 'none';
});

closeChatBtn.addEventListener('click', () => {
    chatboxContainer.classList.remove('active');
    chatLauncher.style.display = 'block';
});

// Handle sending message
sendBtn.addEventListener('click', processUserMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        processUserMessage();
    }
});

function processUserMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    // Display user message
    addMessage(text, 'user');
    chatInput.value = '';

    // Scroll to bottom
    scrollToBottom();

    // Generate AI response after a short delay
    setTimeout(() => {
        const response = generateAIResponse(text.toLowerCase());
        addMessage(response, 'ai');
        scrollToBottom();
    }, 600);
}

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    msgDiv.classList.add(sender);
    msgDiv.textContent = text;
    chatBody.appendChild(msgDiv);
}

function scrollToBottom() {
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Simple keyword matching for fake AI
function generateAIResponse(input) {
    // Keywords
    const dict = {
        price: ['preț', 'pret', 'abonament', 'cost', 'bani', 'plată', 'sedinta'],
        hours: ['program', 'oră', 'ore', 'deschis', 'închis', 'zile'],
        equipment: ['echipament', 'aparate', 'dotări', 'greutăți', 'bandă'],
        location: ['locație', 'adresă', 'unde', 'suceava', 'ipotesti', 'tisauti']
    };

    // Check price
    if (dict.price.some(kw => input.includes(kw))) {
        return "Pentru detalii despre prețuri și abonamente, te rugăm să consulți secțiunea „Prețuri” de pe site sau să ne vizitezi la sală.";
    }
    // Check hours
    if (dict.hours.some(kw => input.includes(kw))) {
        return "Suntem deschiși zilnic (Luni - Duminică) între orele 06:00 și 23:00.";
    }
    // Check equipment
    if (dict.equipment.some(kw => input.includes(kw))) {
        return "Oferim echipamente profesionale și bine întreținute pentru toate tipurile de antrenament (forță și cardio).";
    }
    // Check location
    if (dict.location.some(kw => input.includes(kw))) {
        return "Ne găsiți pe Str. Alexandru cel Bun. 6, Tișăuți, Ipotești, 727325 Suceava.";
    }

    // Fallback
    return "Te rugăm să contactezi personalul nostru telefonic la 0749 268 278 sau direct la recepție pentru mai multe informații.";
}
