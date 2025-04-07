document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const splashScreen = document.querySelector('.splash');
    const appContainer = document.querySelector('.container');
    const userIdInput = document.getElementById('userId');
    const signInBtn = document.getElementById('signInBtn');
    const newUserLink = document.getElementById('newUserLink');
    const troubleLink = document.getElementById('troubleLink');
    const languageBtn = document.getElementById('languageBtn');
    const whatsNewBtn = document.getElementById('whatsNewBtn');
    const securityTipsBtn = document.getElementById('securityTipsBtn');
    const moreBtn = document.getElementById('moreBtn');

    // Modal Elements
    const popupModal = document.getElementById('popupModal');
    const modalHeader = document.getElementById('modalHeader');
    const modalBody = document.getElementById('modalBody');
    const modalOkBtn = document.getElementById('modalOkBtn');

    // Language Modal Elements
    const languageModal = document.getElementById('languageModal');
    const langOptions = languageModal.querySelectorAll('.lang-option');
    const langCancelBtn = document.getElementById('langCancelBtn');

    // Carousel Elements
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.querySelector('.carousel-dots');
    let currentSlide = 0;
    let slideInterval;

    // --- Translations ---
    const translations = {
        en: {
            userIdLabel: 'User ID',
            userIdPlaceholder: 'User ID',
            signIn: 'SIGN IN',
            newUser: 'New user?',
            troubleSigningIn: 'Trouble signing in?',
            connectWithUs: '----Connect with us----',
            language: 'Language',
            whatsNew: 'Whats New',
            securityTips: 'Security Tips',
            more: 'More',
            popupTitle: 'App Maintenance',
            popupBody: 'Heads up! Our app will be unavailable for scheduled maintenance for approximately 3-4 days.',
            ok: 'OK',
            selectLanguage: 'Select Language',
            cancel: 'Cancel',
        },
        hi: {
            userIdLabel: 'उपयोगकर्ता आईडी',
            userIdPlaceholder: 'उपयोगकर्ता आईडी',
            signIn: 'साइन इन करें',
            newUser: 'नया उपयोगकर्ता?',
            troubleSigningIn: 'साइन इन करने में समस्या?',
            connectWithUs: '----हमसे जुड़ें----',
            language: 'भाषा',
            whatsNew: 'नया क्या है',
            securityTips: 'सुरक्षा सुझाव',
            more: 'अधिक',
            popupTitle: 'ऐप रखरखाव',
            popupBody: 'ध्यान दें! हमारा ऐप निर्धारित रखरखाव के लिए लगभग 3-4 दिनों तक अनुपलब्ध रहेगा।',
            ok: 'ठीक है',
            selectLanguage: 'भाषा चुनें',
            cancel: 'रद्द करें',
        }
    };
    let currentLanguage = 'en'; // Default language

    // --- Functions ---

    // Show Splash Screen briefly
    const showApp = () => {
        splashScreen.style.opacity = '0';
        setTimeout(() => {
            splashScreen.style.display = 'none';
            appContainer.style.display = 'flex'; // Use flex as set in CSS
            startCarousel(); // Start carousel after showing app
        }, 500); // Match CSS transition duration
    };

    // Enable/Disable Sign In Button
    const toggleSignInButton = () => {
        if (userIdInput.value.trim() !== '') {
            signInBtn.disabled = false;
        } else {
            signInBtn.disabled = true;
        }
    };

    // Show Modal
    const showPopup = (title, body) => {
        modalHeader.textContent = title;
        modalBody.textContent = body;
        popupModal.classList.add('show');
    };

    // Hide Modal
    const hidePopup = () => {
        popupModal.classList.remove('show');
    };

    // Show Maintenance Popup
    const showMaintenancePopup = () => {
        showPopup(translations[currentLanguage].popupTitle, translations[currentLanguage].popupBody);
    };

     // Show Language Modal
    const showLanguageModal = () => {
        languageModal.classList.add('show');
    };

    // Hide Language Modal
    const hideLanguageModal = () => {
        languageModal.classList.remove('show');
    };

    // Apply Translations
    const applyTranslations = (lang) => {
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
         document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
            const key = el.getAttribute('data-lang-placeholder');
            if (translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });
        // Update modal button text if it's open (edge case)
        modalOkBtn.textContent = translations[lang].ok;
        langCancelBtn.textContent = translations[lang].cancel;

        // Re-check sign in button state (placeholder might change affecting perceived input)
        // toggleSignInButton(); Not really needed as value doesn't change, only placeholder
    };

     // Change Language
    const changeLanguage = (lang) => {
        if (translations[lang]) {
            currentLanguage = lang;
            applyTranslations(lang);
            hideLanguageModal();
            document.documentElement.lang = lang; // Set html lang attribute
        }
    };


    // Carousel Functions
    const createDots = () => {
        slides.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showSlide(i));
            dotsContainer.appendChild(dot);
        });
    };

    const updateDots = (index) => {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    };

    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        currentSlide = index;
        updateDots(index);
    };

    const nextSlide = () => {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    };

    const startCarousel = () => {
        if(slides.length > 0) {
            showSlide(0); // Show the first slide initially
            if (slideInterval) clearInterval(slideInterval); // Clear existing interval if any
            slideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
        }
    };

    // --- Event Listeners ---
    userIdInput.addEventListener('input', toggleSignInButton);

    // Buttons/Links that show Maintenance Popup
    signInBtn.addEventListener('click', () => {
        if (!signInBtn.disabled) {
            showMaintenancePopup();
        }
    });
    newUserLink.addEventListener('click', (e) => {
        e.preventDefault();
        showMaintenancePopup();
    });
    troubleLink.addEventListener('click', (e) => {
        e.preventDefault();
        showMaintenancePopup();
    });
    whatsNewBtn.addEventListener('click', showMaintenancePopup);
    securityTipsBtn.addEventListener('click', showMaintenancePopup);
    moreBtn.addEventListener('click', showMaintenancePopup);

    // Modal OK Button
    modalOkBtn.addEventListener('click', hidePopup);

    // Language Button
    languageBtn.addEventListener('click', showLanguageModal);

    // Language Modal Options
    langOptions.forEach(button => {
        button.addEventListener('click', () => {
            changeLanguage(button.getAttribute('data-lang'));
        });
    });
    langCancelBtn.addEventListener('click', hideLanguageModal);

    // Close modal if clicking outside the content (optional)
    popupModal.addEventListener('click', (e) => {
        if (e.target === popupModal) {
            hidePopup();
        }
    });
     languageModal.addEventListener('click', (e) => {
        if (e.target === languageModal) {
            hideLanguageModal();
        }
    });


    // --- Initialisation ---
    applyTranslations(currentLanguage); // Set initial text based on default language
    toggleSignInButton(); // Initial check for sign-in button state
    if (slides.length > 0) {
         createDots();
         // Carousel starting is delayed until splash screen hides
    }
    showApp(); // Hide splash and show the main app

});