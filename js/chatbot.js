/* 
========================================================================
   MEDTRUST FLOATING CHATBOT WIDGET
   Premium DOM Builder and Interaction Controller for Chatbase Widget
======================================================================== 
*/

document.addEventListener('DOMContentLoaded', () => {
  // Prevent executing/building if already initialized
  if (document.getElementById('medtrust-chatbot')) return;

  // 1. Create primary chatbot container
  const chatbotContainer = document.createElement('div');
  chatbotContainer.id = 'medtrust-chatbot';
  chatbotContainer.className = 'chatbot-container';

  // 2. Create Floating Action Button (FAB)
  const chatbotFab = document.createElement('button');
  chatbotFab.id = 'chatbot-fab';
  chatbotFab.className = 'chatbot-fab';
  chatbotFab.setAttribute('aria-label', 'Open support chat');
  chatbotFab.innerHTML = `
    <!-- Speech bubble chat icon -->
    <svg class="chat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
    <!-- Close cross icon -->
    <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display: none;">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
    <!-- Premium green pulse active dot -->
    <span class="notification-dot"></span>
  `;

  // 3. Create Chat window
  const chatbotWindow = document.createElement('div');
  chatbotWindow.id = 'chatbot-window';
  chatbotWindow.className = 'chatbot-window';
  chatbotWindow.innerHTML = `
    <div class="chatbot-header">
      <div class="chatbot-avatar-container">
        <div class="chatbot-avatar">MT</div>
        <span class="chatbot-status-dot"></span>
      </div>
      <div class="chatbot-header-info">
        <h4>MEDTRUST Assistant</h4>
        <p>Online Support • Powered by AI</p>
      </div>
      <button class="chatbot-close-btn" aria-label="Minimize chat" id="chatbotCloseBtn">✕</button>
    </div>
    <div class="chatbot-body">
      <!-- Loading spinner while iframe loads -->
      <div class="chatbot-loading" id="chatbotLoading">
        <div class="spinner"></div>
        <p>Connecting to support assistant...</p>
      </div>
      <!-- User's exact Chatbase chatbot widget iframe -->
      <iframe
        src="https://www.chatbase.co/chatbot-iframe/goVvsBK5-kd0DtnN0Y-8F"
        width="100%"
        height="100%"
        frameborder="0"
        allow="microphone"
        title="MEDTRUST Virtual Assistant"
        id="chatbotIframe"
      ></iframe>
    </div>
  `;

  // 4. Assemble the chatbot components
  chatbotContainer.appendChild(chatbotFab);
  chatbotContainer.appendChild(chatbotWindow);
  document.body.appendChild(chatbotContainer);

  // 5. Setup interaction event handlers
  const chatIcon = chatbotFab.querySelector('.chat-icon');
  const closeIcon = chatbotFab.querySelector('.close-icon');
  const notificationDot = chatbotFab.querySelector('.notification-dot');
  const chatbotLoading = document.getElementById('chatbotLoading');
  const chatbotIframe = document.getElementById('chatbotIframe');

  const toggleChat = (event) => {
    if (event) event.stopPropagation();
    
    const isOpen = chatbotWindow.classList.toggle('active');
    chatbotFab.classList.toggle('active');

    if (isOpen) {
      chatIcon.style.display = 'none';
      closeIcon.style.display = 'block';
      if (notificationDot) {
        notificationDot.style.display = 'none'; // Dismiss active helper dot on first open
      }
      
      // Auto-focus the chat window input if possible
      try {
        chatbotIframe.focus();
      } catch (e) {
        // cross-origin prevention safe-fail
      }
    } else {
      chatIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    }
  };

  // Bind clicks
  chatbotFab.addEventListener('click', toggleChat);
  document.getElementById('chatbotCloseBtn').addEventListener('click', toggleChat);

  // Close chat when clicking outside the chatbot-window on desktop
  document.addEventListener('click', (event) => {
    const isClickInside = chatbotContainer.contains(event.target);
    if (!isClickInside && chatbotWindow.classList.contains('active')) {
      // Check if we are not on mobile screen width (480px) to prevent closing mid-interactions
      if (window.innerWidth > 480) {
        toggleChat();
      }
    }
  });

  // Handle iframe load completion to fade out spinner seamlessly
  chatbotIframe.addEventListener('load', () => {
    if (chatbotLoading) {
      chatbotLoading.style.opacity = '0';
      setTimeout(() => {
        chatbotLoading.style.display = 'none';
      }, 300);
    }
  });
});
