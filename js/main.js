/*
========================================================================
   MEDTRUST PRIMARY INTERACTIVE SCRIPTS
   Responsive Handlers, Tickers, Filters, and Wizard State Machine
========================================================================
*/

// --- Google Sheets Deployed Apps Script Web App URL Endpoint ---
// Paste your deployed Google Apps Script Web App URL here to connect the frontend to Google Sheets!
// If left empty, the site automatically runs in offline/mock preview mode for styling/testing.
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw7j1z7mtr5B8B_akLT5WKOof0fxJA2Ahv54Fbb4cHO-DhZEWA6K0K8UBfpvi8ZlLDI/exec";

document.addEventListener('DOMContentLoaded', () => {
  // Initialize general elements
  initHeaderScroll();
  initMobileMenu();
  initStatsCounters();
  initAccordions();
  initServiceFilters();
  initBookingWizard();
  initModals();
  initActiveBookingNavbarBadge(); // Initialize navbar booking indicator badge
  // initWhatsAppWidget(); // Initialize floating WhatsApp CTA widget
  initSpecialitiesSlider(); // Initialize specialties horizontal image slider
  initScrollReveal(); // Initialize scroll-reveal intro animations
  initHeroScrollAnimation(); // Initialize scroll-driven hero frame animation
});

/* ========================================================================
   1. HEADER SCROLL & SHADOW EFFECT
   ======================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const checkScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };

  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Initial check
}

/* ========================================================================
   2. MOBILE NAV DRAWER TOGGLE
   ======================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('open');
    drawer.classList.toggle('active');

    // Prevent background scrolling when menu is open
    if (drawer.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  // Close drawer if a navigation link is clicked
  const drawerLinks = drawer.querySelectorAll('.mobile-nav-link');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.classList.remove('open');
      drawer.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ========================================================================
   3. ANIMATED STATISTICS COUNTERS
   ======================================================================== */
function initStatsCounters() {
  const statsSection = document.querySelector('.hero-stats');
  if (!statsSection) return;

  const statNumbers = document.querySelectorAll('.stat-number-value');
  let started = false;

  const startCounting = () => {
    statNumbers.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const duration = 1500; // Total duration in ms
      const stepTime = 15; // Interval between steps
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;

      let currentVal = 0;
      let stepCount = 0;

      const timer = setInterval(() => {
        stepCount++;
        currentVal += increment;

        if (stepCount >= totalSteps) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(currentVal);
        }
      }, stepTime);
    });
  };

  // Intersection Observer to fire counters when scrolled into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        startCounting();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statsSection);
}

/* ========================================================================
   4. INTERACTIVE FAQS ACCORDIONS
   ======================================================================== */
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      // Close all accordions first
      document.querySelectorAll('.accordion-item').forEach(accItem => {
        accItem.classList.remove('active');
      });

      // Toggle this item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ========================================================================
   5. SERVICES SEARCH & CATEGORY FILTERING
   ======================================================================== */
function initServiceFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const searchInput = document.querySelector('.search-input');
  const serviceCards = document.querySelectorAll('.service-item-card');

  if (filterTabs.length === 0 && !searchInput) return;

  let activeCategory = 'all';
  let searchQuery = '';

  const filterCards = () => {
    serviceCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const name = card.querySelector('.service-item-name').textContent.toLowerCase();
      const desc = card.querySelector('.service-item-description').textContent.toLowerCase();

      const matchesCategory = activeCategory === 'all' || category === activeCategory;
      const matchesSearch = name.includes(searchQuery) || desc.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  };

  // Tab click listener
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.getAttribute('data-filter');
      filterCards();
    });
  });

  // Search input listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      filterCards();
    });
  }
}

/* ========================================================================
   6. INTERACTIVE MULTI-STEP APPOINTMENT SCHEDULER WIZARD
   ======================================================================== */
function initBookingWizard() {
  const wizard = document.getElementById('bookingWizard');
  if (!wizard) return;

  const panels = wizard.querySelectorAll('.wizard-step-panel');
  const nodes = wizard.querySelectorAll('.wizard-step-node');
  const prevBtn = wizard.querySelector('#wizardPrevBtn');
  const nextBtn = wizard.querySelector('#wizardNextBtn');

  // Spacing: set today's min date
  const dateInput = document.getElementById('patientDate');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  const nameInput = document.getElementById('patientName');
  const phoneInput = document.getElementById('patientPhone');
  const serviceSelect = document.getElementById('patientService');
  const timeSelect = document.getElementById('patientTime');
  const notesTextarea = document.getElementById('consultReason');

  let currentStep = 1;
  const totalSteps = 2;

  const validateForm = () => {
    const nameVal = nameInput ? nameInput.value.trim() : '';
    const phoneVal = phoneInput ? phoneInput.value.trim() : '';
    const serviceVal = serviceSelect ? serviceSelect.value : '';
    const dateVal = dateInput ? dateInput.value : '';
    const timeVal = timeSelect ? timeSelect.value : '';

    const isNameValid = nameVal.length >= 2;

    const cleanPhone = phoneVal.replace(/[\s\(\)\+-]/g, '');
    const isPhoneValid = /^[0-9]{10,12}$/.test(cleanPhone);

    const phoneErrorSpan = wizard.querySelector('#phoneError');

    if (phoneErrorSpan) {
      phoneErrorSpan.style.display = (phoneVal.length > 0 && !isPhoneValid) ? 'block' : 'none';
      if (phoneInput) phoneInput.style.borderColor = (phoneVal.length > 0 && !isPhoneValid) ? '#EF4444' : '';
    }

    const isValid = isNameValid && isPhoneValid && serviceVal !== '' && dateVal !== '' && timeVal !== '';
    if (nextBtn) nextBtn.disabled = !isValid;
    return isValid;
  };

  // Add event listeners to input fields to validate on input
  [nameInput, phoneInput, serviceSelect, dateInput, timeSelect].forEach(input => {
    if (input) {
      input.addEventListener('input', validateForm);
      input.addEventListener('change', validateForm);
    }
  });

  const calculateApproxTime = (sessionStr, token) => {
    const isAM = sessionStr.toUpperCase().includes("AM");
    const startHour = isAM ? 10 : 3;
    const totalMinutes = (token - 1) * 15;
    const finalHour24 = startHour + Math.floor(totalMinutes / 60);
    const finalMinute = totalMinutes % 60;

    const amPm = isAM ? "AM" : "PM";
    const displayHour = finalHour24 > 12 ? finalHour24 - 12 : finalHour24;
    const formattedMinute = finalMinute === 0 ? "00" : finalMinute;
    return `${displayHour}:${formattedMinute} ${amPm}`;
  };

  const updateWizardDisplay = () => {
    panels.forEach(panel => {
      panel.classList.remove('active');
      if (parseInt(panel.getAttribute('data-step'), 10) === currentStep) {
        panel.classList.add('active');
      }
    });

    nodes.forEach(node => {
      const stepNum = parseInt(node.getAttribute('data-step'), 10);
      node.classList.remove('active', 'completed');
      if (stepNum === currentStep) {
        node.classList.add('active');
      } else if (stepNum < currentStep) {
        node.classList.add('completed');
      }
    });

    if (currentStep === 1) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) {
        nextBtn.style.display = 'flex';
        nextBtn.textContent = 'Submit Request';
      }
      wizard.querySelector('.wizard-header-steps').style.display = 'grid';
    } else if (currentStep === 2) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      wizard.querySelector('.wizard-header-steps').style.display = 'none';
    }
  };

  // Submit request action
  if (nextBtn) {
    nextBtn.addEventListener('click', async () => {
      if (!validateForm()) return;

      nextBtn.disabled = true;
      nextBtn.textContent = 'Submitting Request... ⏳';

      const serviceVal = serviceSelect.value;
      const dateVal = dateInput.value;
      const timeVal = timeSelect.value;
      const nameVal = nameInput.value.trim();
      const phoneVal = phoneInput.value.trim();
      const notesVal = notesTextarea ? notesTextarea.value.trim() : '';

      // Populate Success views
      wizard.querySelector('#summaryService').textContent = serviceVal;
      wizard.querySelector('#summaryDate').textContent = dateVal;
      wizard.querySelector('#summaryTime').textContent = timeVal;
      wizard.querySelector('#summaryName').textContent = nameVal;
      wizard.querySelector('#summaryPhone').textContent = phoneVal;

      // Save to localStorage for the active booking card dashboard!
      const activeBooking = {
        name: nameVal,
        phone: phoneVal,
        service: serviceVal,
        doctor: 'Specialist Clinician', // General doctor placeholder
        date: dateVal,
        time: timeVal
      };
      localStorage.setItem('medtrust_active_booking', JSON.stringify(activeBooking));

      if (typeof initActiveBookingNavbarBadge === 'function') {
        initActiveBookingNavbarBadge();
      }

      currentStep = 2;
      updateWizardDisplay();

      // Smooth scroll to top
      const headerOffset = 100;
      const wizardTop = wizard.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: wizardTop - headerOffset,
        behavior: 'smooth'
      });
    });
  }

  // Cancel Booking action
  const checkActiveBooking = () => {
    const bookingJson = localStorage.getItem('medtrust_active_booking');
    const container = document.getElementById('activeBookingContainer');
    const wizardSection = document.getElementById('bookingSection');

    if (bookingJson && container) {
      const appt = JSON.parse(bookingJson);

      const greetingEl = document.getElementById('activeCardGreeting');
      if (greetingEl) greetingEl.textContent = `Welcome back, ${appt.name}!`;



      const docEl = document.getElementById('activeCardDoctor');
      if (docEl) docEl.textContent = appt.doctor;

      const dateEl = document.getElementById('activeCardDate');
      if (dateEl) dateEl.textContent = appt.date;

      const timeEl = document.getElementById('activeCardTime');
      if (timeEl) timeEl.textContent = appt.time;

      const serviceEl = document.getElementById('activeCardService');
      if (serviceEl) serviceEl.textContent = appt.service;

      container.style.display = 'block';
      if (wizardSection) wizardSection.style.display = 'none';
    } else {
      if (container) container.style.display = 'none';
      if (wizardSection) wizardSection.style.display = 'block';
    }
  };

  const btnCancel = document.getElementById('btnCancelActiveBooking');
  if (btnCancel) {
    btnCancel.addEventListener('click', () => {
      if (confirm("Are you sure you want to cancel your scheduled consultation?")) {
        localStorage.removeItem('medtrust_active_booking');

        // Reset inputs
        if (nameInput) nameInput.value = '';
        if (phoneInput) phoneInput.value = '';
        if (serviceSelect) serviceSelect.selectedIndex = 0;
        if (dateInput) dateInput.value = '';
        if (timeSelect) timeSelect.selectedIndex = 0;
        if (notesTextarea) notesTextarea.value = '';

        currentStep = 1;
        if (nextBtn) {
          nextBtn.disabled = true;
          nextBtn.textContent = 'Submit Request';
        }
        updateWizardDisplay();
        checkActiveBooking();

        if (typeof initActiveBookingNavbarBadge === 'function') {
          initActiveBookingNavbarBadge();
        }
      }
    });
  }


  checkActiveBooking();
  updateWizardDisplay();
}

/* ========================================================================
   6B. ACTIVE BOOKING NAVBAR BADGE INDICATOR
   ======================================================================== */
function initActiveBookingNavbarBadge() {
  const bookingJson = localStorage.getItem('medtrust_active_booking');
  const navLinks = document.querySelectorAll('.nav-link[href="appointment.html"], .mobile-nav-link[href="appointment.html"]');

  if (!bookingJson) {
    // Clean up indicator if it exists
    navLinks.forEach(link => {
      const indicator = link.querySelector('.nav-booking-indicator');
      if (indicator) {
        indicator.remove();
      }
    });
    return;
  }

  const appt = JSON.parse(bookingJson);
  navLinks.forEach(link => {
    if (!link.querySelector('.nav-booking-indicator')) {
      link.style.position = 'relative';
      link.style.display = 'inline-flex';
      link.style.alignItems = 'center';
      link.style.gap = '6px';

      const dot = document.createElement('span');
      dot.className = 'nav-booking-indicator';
      dot.style.width = '8px';
      dot.style.height = '8px';
      dot.style.backgroundColor = '#16A34A';
      dot.style.borderRadius = '50%';
      dot.style.display = 'inline-block';
      dot.title = `Active Booking`;
      dot.style.boxShadow = '0 0 0 0 rgba(22, 163, 74, 0.7)';
      dot.style.animation = 'pulse-green 2s infinite';

      link.appendChild(dot);
    }
  });
}


/* ========================================================================
   7. DIALOGS MODALS SYSTEM
   ======================================================================== */
function initModals() {
  const openButtons = document.querySelectorAll('[data-open-modal]');
  const closeButtons = document.querySelectorAll('[data-close-modal]');
  const overlays = document.querySelectorAll('.modal-overlay');

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-open-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      overlays.forEach(overlay => overlay.classList.remove('active'));
      document.body.style.overflow = '';
    });
  });

  // Click on background overlay to close
  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
}

/* ========================================================================
   9. PREMIUM FLOATING WHATSAPP CHAT WIDGET
   ======================================================================== */
function initWhatsAppWidget() {
  // Check if widget already exists to prevent duplication
  if (document.getElementById('whatsappWidgetContainer')) return;

  const phone = '919562225777'; // Clean phone number format for WhatsApp link API
  const defaultMsg = encodeURIComponent("Hi! I'd like to ask a question about MEDTRUST services.");
  const waLink = 'https://wa.me/' + phone + '?text=' + defaultMsg;

  // Create the widget HTML structure
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'whatsappWidgetContainer';
  widgetContainer.className = 'whatsapp-widget-container';
  widgetContainer.innerHTML = `
    <!-- Tooltip (Shows on hover) -->
    <div class="whatsapp-tooltip" id="whatsappTooltip">Need Help? Chat with us!</div>

    <!-- Chat Box Card -->
    <div class="whatsapp-chat-box" id="whatsappChatBox">
      <div class="whatsapp-chat-header">
        <div class="whatsapp-chat-avatar">MT</div>
        <div class="whatsapp-chat-meta">
          <span class="whatsapp-chat-name">MEDTRUST Support</span>
          <span class="whatsapp-chat-status">Typically replies in minutes</span>
        </div>
        <button class="whatsapp-chat-close" id="whatsappChatClose" aria-label="Close Chat">✕</button>
      </div>
      <div class="whatsapp-chat-body">
        <div class="whatsapp-chat-bubble">
          Hi there! 👋 Welcome to MEDTRUST.
          <br><br>
          How can we help you today? Let us know if you need assistance with booking, clinics, or doctors!
          <span class="whatsapp-chat-time" id="whatsappChatTime">10:00 AM</span>
        </div>
      </div>
      <div class="whatsapp-chat-footer">
        <a href="#" target="_blank" rel="noopener" class="whatsapp-cta-btn" id="whatsappCtaBtn">
          <!-- WhatsApp Icon -->
          <svg viewBox="0 0 448 512" fill="currentColor">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L3 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
          </svg>
          Chat on WhatsApp
        </a>
      </div>
    </div>

    <!-- Toggle Action Button -->
    <button class="whatsapp-toggle-btn" id="whatsappToggleBtn" aria-label="Open WhatsApp Chat">
      <!-- Badge notification dot -->
      <span class="whatsapp-badge" id="whatsappBadge">1</span>
      
      <!-- Toggle Icon -->
      <svg id="whatsappToggleIcon" viewBox="0 0 448 512" fill="currentColor">
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L3 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
      </svg>
    </button>
  `;

  document.body.appendChild(widgetContainer);

  // Set the CTA Link
  const ctaBtn = document.getElementById('whatsappCtaBtn');
  if (ctaBtn) {
    ctaBtn.href = waLink;
  }

  const toggleBtn = document.getElementById('whatsappToggleBtn');
  const chatBox = document.getElementById('whatsappChatBox');
  const closeBtn = document.getElementById('whatsappChatClose');
  const badge = document.getElementById('whatsappBadge');
  const tooltip = document.getElementById('whatsappTooltip');
  const timeSpan = document.getElementById('whatsappChatTime');

  // Set the current time in the message bubble
  if (timeSpan) {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    timeSpan.textContent = hours + ':' + minutes + ' ' + ampm;
  }

  // Toggle Chat Box
  const toggleChat = () => {
    const isActive = chatBox.classList.contains('active');
    if (isActive) {
      chatBox.classList.remove('active');
      widgetContainer.classList.remove('active');
      toggleBtn.classList.remove('open');
    } else {
      chatBox.classList.add('active');
      widgetContainer.classList.add('active');
      toggleBtn.classList.add('open');
      // Hide and remove badge once opened
      if (badge) {
        badge.style.display = 'none';
      }
    }
  };

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleChat();
  });

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    chatBox.classList.remove('active');
    widgetContainer.classList.remove('active');
    toggleBtn.classList.remove('open');
  });

  // Close chat when clicking outside
  document.addEventListener('click', (e) => {
    if (!widgetContainer.contains(e.target) && chatBox.classList.contains('active')) {
      chatBox.classList.remove('active');
      widgetContainer.classList.remove('active');
      toggleBtn.classList.remove('open');
    }
  });

  // Prevent closing when clicking inside the chat box
  chatBox.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Dynamic entry animations - show the tooltip after a small delay
  setTimeout(() => {
    if (!chatBox.classList.contains('active')) {
      tooltip.style.opacity = '1';
      tooltip.style.transform = 'translateX(0)';

      // Auto-hide tooltip after 6 seconds if not clicked
      setTimeout(() => {
        if (!chatBox.classList.contains('active')) {
          tooltip.style.opacity = '';
          tooltip.style.transform = '';
        }
      }, 6000);
    }
  }, 3000);
}

/* ========================================================================
   SPECIALITIES HORIZONTAL SLIDER (INFINITE LOOP CAROUSEL)
   ======================================================================== */
function initSpecialitiesSlider() {
  const container = document.querySelector('.specialities-scroll-container');
  const prevBtn = document.querySelector('.slider-arrow.prev');
  const nextBtn = document.querySelector('.slider-arrow.next');

  if (!container) return;

  const originalCards = Array.from(container.querySelectorAll('.speciality-image-card'));
  if (originalCards.length === 0) return;

  const cloneCount = 4; // Number of cards to clone for infinite wrapping safety margin

  // Clone first 4 cards and append to the end
  for (let i = 0; i < cloneCount; i++) {
    const clone = originalCards[i].cloneNode(true);
    container.appendChild(clone);
  }

  // Clone last 4 cards and prepend to the start
  for (let i = originalCards.length - cloneCount; i < originalCards.length; i++) {
    const clone = originalCards[i].cloneNode(true);
    container.insertBefore(clone, container.firstChild);
  }

  // Function to get scroll step (width of one card + gap)
  const getScrollStep = () => {
    const card = container.querySelector('.speciality-image-card');
    if (!card) return 320;
    const style = window.getComputedStyle(container);
    const gap = parseFloat(style.gap) || 32;
    return card.offsetWidth + gap;
  };

  // Set initial scroll position to skip start clones
  let isScrollLock = false;
  const initPosition = () => {
    const step = getScrollStep();
    container.style.scrollBehavior = 'auto'; // Instant shift
    container.scrollLeft = cloneCount * step;
    container.style.scrollBehavior = 'smooth'; // Restore smooth scroll
  };

  // Run initial alignment after layout settles
  setTimeout(initPosition, 100);

  // Click listeners for arrows
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      container.style.scrollBehavior = 'smooth';
      container.scrollBy({
        left: -getScrollStep(),
        behavior: 'smooth'
      });
      resetAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      container.style.scrollBehavior = 'smooth';
      container.scrollBy({
        left: getScrollStep(),
        behavior: 'smooth'
      });
      resetAutoPlay();
    });
  }

  // Loop wrapping check
  const handleLoopWrapping = () => {
    if (isScrollLock) return;

    const step = getScrollStep();
    const originalWidth = originalCards.length * step;
    const maxScroll = container.scrollWidth - container.clientWidth;

    // Wrap around from beginning (left clones) to actual end cards
    if (container.scrollLeft <= step) {
      isScrollLock = true;
      container.style.scrollBehavior = 'auto'; // Disable smooth scroll for instant jump
      container.scrollLeft += originalWidth;
      requestAnimationFrame(() => {
        container.style.scrollBehavior = 'smooth';
        isScrollLock = false;
      });
    }
    // Wrap around from end (right clones) to actual beginning cards
    else if (container.scrollLeft >= maxScroll - step) {
      isScrollLock = true;
      container.style.scrollBehavior = 'auto'; // Disable smooth scroll for instant jump
      container.scrollLeft -= originalWidth;
      requestAnimationFrame(() => {
        container.style.scrollBehavior = 'smooth';
        isScrollLock = false;
      });
    }
  };

  // Function to update the center card styling scale
  const updateCenterCard = () => {
    const rect = container.getBoundingClientRect();
    const containerCenter = rect.left + rect.width / 2;
    const cards = container.querySelectorAll('.speciality-image-card');

    let closestCard = null;
    let minDistance = Infinity;

    cards.forEach(card => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(cardCenter - containerCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestCard = card;
      }
    });

    cards.forEach(card => {
      if (card === closestCard) {
        card.classList.add('is-center');
      } else {
        card.classList.remove('is-center');
      }
    });
  };

  // Mouse Drag-to-Scroll Functionality
  let isDown = false;
  let startX;
  let scrollLeftStart;
  let wasDragged = false;

  container.addEventListener('mousedown', (e) => {
    isDown = true;
    wasDragged = false;
    startX = e.pageX - container.offsetLeft;
    scrollLeftStart = container.scrollLeft;
    container.style.scrollBehavior = 'auto'; // Instant response during drag
    stopAutoPlay();
  });

  container.addEventListener('mouseleave', () => {
    if (isDown) {
      isDown = false;
      container.style.scrollBehavior = 'smooth';
      startAutoPlay();
    }
  });

  container.addEventListener('mouseup', () => {
    if (isDown) {
      isDown = false;
      container.style.scrollBehavior = 'smooth';
      startAutoPlay();
    }
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.25; // Speed factor
    if (Math.abs(walk) > 5) {
      wasDragged = true;
    }
    container.scrollLeft = scrollLeftStart - walk;
  });

  // Attach scroll listeners
  container.addEventListener('scroll', () => {
    handleLoopWrapping();
    updateCenterCard();
  });

  window.addEventListener('resize', () => {
    initPosition();
    updateCenterCard();
  });

  // Make all cards (including clones) clickable to redirect to department-details.html
  const attachClickRedirection = () => {
    const cards = container.querySelectorAll('.speciality-image-card');
    cards.forEach(card => {
      card.style.cursor = 'pointer';
      card.onclick = (e) => {
        if (wasDragged) {
          wasDragged = false; // Reset flag and prevent navigation
          return;
        }
        stopAutoPlay(); // Stop scroll auto stop!
        const deptKey = card.getAttribute('data-dept') || 'general-medicine';
        window.location.href = `department-details.html?dept=${deptKey}`;
      };
    });
  };
  
  // Attach listeners to original + clones
  setTimeout(attachClickRedirection, 200);

  // Auto-play sliding animation (seamless loop, card-by-card)
  let autoPlayInterval;
  
  const startAutoPlay = () => {
    autoPlayInterval = setInterval(() => {
      container.style.scrollBehavior = 'smooth';
      container.scrollBy({
        left: getScrollStep(),
        behavior: 'smooth'
      });
    }, 3000); // Transitions every 3.0 seconds
  };

  const stopAutoPlay = () => {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
    }
  };

  const resetAutoPlay = () => {
    stopAutoPlay();
    startAutoPlay();
  };

  // Start autoplay
  startAutoPlay();

  // Pause autoplay on mouse hover or touch interaction
  container.addEventListener('touchstart', stopAutoPlay, { passive: true });
  container.addEventListener('touchend', startAutoPlay, { passive: true });

  // Initial center card calculation
  setTimeout(updateCenterCard, 150);
}

/* ========================================================================
   11. SCROLL REVEAL INTRO ANIMATIONS
   ======================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-element');
  if (revealElements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.02
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    observer.observe(el);
  });
}

/* ========================================================================
   12. SCROLL-DRIVEN HERO FRAME ANIMATION
   ======================================================================== */
function initHeroScrollAnimation() {
  const section = document.getElementById("heroScrollSection");
  const canvas = document.getElementById("heroCanvas");
  if (!section || !canvas) return;

  const stickyWrapper = section.querySelector('.sticky-wrapper');
  const context = canvas.getContext("2d");
  const frameCount = 120;
  const currentFrame = index => (
    `assets/images/her2/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
  );

  // Preload Images
  const images = [];
  let loadedCount = 0;
  
  // Resizing Cover Ratio Logic Helper (Cover style drawing on Canvas)
  const drawImageProp = (ctx, img) => {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const iw = img.width;
    const ih = img.height;
    const r = Math.min(w / iw, h / ih);
    let nw = iw * r;
    let nh = ih * r;
    let cx, cy, cw, ch, ar = 1;

    if (nw < w) ar = w / nw;                             
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;
    nw *= ar;
    nh *= ar;

    cw = iw / (nw / w);
    ch = ih / (nh / h);

    cx = (iw - cw) * 0.5;
    cy = (ih - ch) * 0.5;

    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;

    ctx.drawImage(img, cx, cy, cw, ch, 0, 0, w, h);
  };

  const drawFrame = (index) => {
    const img = images[index];
    if (img && img.complete) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawImageProp(context, img);
    }
  };

  // Set up images array with Image objects
  for (let i = 0; i < frameCount; i++) {
    images.push(new Image());
  }

  // Load first frame with high priority
  const firstImage = images[0];
  firstImage.onload = () => {
    loadedCount++;
    // Render first frame immediately once loaded
    drawFrame(0);

    // Kick off remaining frames preloading after first frame is drawn
    preloadRemainingFrames();
  };
  firstImage.src = currentFrame(1);

  function preloadRemainingFrames() {
    for (let i = 2; i <= frameCount; i++) {
      const img = images[i - 1];
      img.onload = () => {
        loadedCount++;
      };
      img.src = currentFrame(i);
    }
  }

  // Handle Resize
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Find current scroll fraction and redraw the correct frame
    const sectionRect = section.getBoundingClientRect();
    const sectionTop = window.scrollY + sectionRect.top;
    const sectionHeight = sectionRect.height;
    const scrollMax = sectionHeight - window.innerHeight;
    const relativeScroll = window.scrollY - sectionTop;
    
    let fraction = 0;
    if (relativeScroll > 0) {
      fraction = Math.min(1, relativeScroll / scrollMax);
    }
    const frameIndex = Math.min(frameCount - 1, Math.floor(fraction * frameCount));
    drawFrame(frameIndex);
  };

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener("resize", resizeCanvas);

  // Text Elements
  const step1 = document.getElementById("scrollStep1");
  const step2 = document.getElementById("scrollStep2");

  // Initial opacity setup
  if (step1) {
    step1.style.opacity = "1";
    step1.style.transform = "translateY(0)";
  }
  if (step2) {
    step2.style.opacity = "0";
    step2.style.transform = "translateY(30px)";
    step2.style.pointerEvents = "none";
  }

  // Scroll Handler
  const handleScroll = () => {
    const sectionRect = section.getBoundingClientRect();
    const sectionTop = window.scrollY + sectionRect.top;
    const sectionHeight = sectionRect.height;
    const scrollMax = sectionHeight - window.innerHeight;
    const relativeScroll = window.scrollY - sectionTop;

    let fraction = 0;
    if (relativeScroll <= 0) {
      fraction = 0;
    } else if (relativeScroll >= scrollMax) {
      fraction = 1;
    } else {
      fraction = relativeScroll / scrollMax;
    }

    const frameIndex = Math.min(frameCount - 1, Math.floor(fraction * frameCount));
    
    // Draw canvas frame
    drawFrame(frameIndex);

    // Text step opacity / translate animations based on scroll fraction
    if (step1 && step2) {
      if (fraction <= 0.35) {
        step1.style.opacity = "1";
        step1.style.transform = "translateY(0)";
        step1.style.pointerEvents = "auto";
        
        step2.style.opacity = "0";
        step2.style.transform = "translateY(30px)";
        step2.style.pointerEvents = "none";
      } else if (fraction > 0.35 && fraction < 0.45) {
        const outFraction = (fraction - 0.35) / 0.10;
        step1.style.opacity = (1 - outFraction).toString();
        step1.style.transform = `translateY(${-outFraction * 30}px)`;
        step1.style.pointerEvents = "none";
        
        step2.style.opacity = "0";
        step2.style.transform = "translateY(30px)";
        step2.style.pointerEvents = "none";
      } else if (fraction >= 0.45 && fraction <= 0.80) {
        step1.style.opacity = "0";
        step1.style.transform = "translateY(-30px)";
        step1.style.pointerEvents = "none";
        
        const inFraction = Math.min(1, (fraction - 0.45) / 0.10);
        step2.style.opacity = inFraction.toString();
        step2.style.transform = `translateY(${(1 - inFraction) * 30}px)`;
        step2.style.pointerEvents = "auto";
      } else {
        const outFraction = Math.min(1, (fraction - 0.80) / 0.15);
        step1.style.opacity = "0";
        
        step2.style.opacity = (1 - outFraction).toString();
        step2.style.transform = `translateY(${-outFraction * 30}px)`;
        step2.style.pointerEvents = "none";
      }
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  // Run scroll align on slight timeout to match browser content loading offsets
  setTimeout(handleScroll, 100);
}
