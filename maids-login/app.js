// Login Page JavaScript - Maids of Cy-Fair
(function() {
    'use strict';
    
    // DOM Elements
    let tabButtons, tabPanels, customerForm, staffForm, messageDisplay, messageText, messageClose;
    let backToWebsiteBtn, customerForgotBtn, staffForgotBtn, signupBtn;
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeElements();
        if (validateDOMElements()) {
            setupEventListeners();
            logInitializationInfo();
        } else {
            console.error('Failed to initialize - missing DOM elements');
        }
    });
    
    function initializeElements() {
        // Get all DOM elements
        tabButtons = document.querySelectorAll('.tab-btn');
        tabPanels = document.querySelectorAll('.tab-panel');
        customerForm = document.getElementById('customer-form');
        staffForm = document.getElementById('staff-form');
        messageDisplay = document.getElementById('message-display');
        messageText = document.getElementById('message-text');
        messageClose = document.getElementById('message-close');
        backToWebsiteBtn = document.getElementById('back-to-website');
        customerForgotBtn = document.getElementById('customer-forgot-link');
        staffForgotBtn = document.getElementById('staff-forgot-link');
        signupBtn = document.getElementById('signup-link');
    }
    
    function validateDOMElements() {
        const requiredElements = [
            tabButtons.length > 0,
            tabPanels.length > 0,
            customerForm,
            staffForm,
            messageDisplay,
            messageText,
            messageClose
        ];
        return requiredElements.every(element => element);
    }
    
    function setupEventListeners() {
        // Tab switching
        tabButtons.forEach(button => {
            button.addEventListener('click', handleTabClick);
        });
        
        // Form submissions
        customerForm.addEventListener('submit', handleCustomerSubmit);
        staffForm.addEventListener('submit', handleStaffSubmit);
        
        // Link buttons
        if (customerForgotBtn) {
            customerForgotBtn.addEventListener('click', () => handleForgotPassword('customer'));
        }
        if (staffForgotBtn) {
            staffForgotBtn.addEventListener('click', () => handleForgotPassword('staff'));
        }
        if (signupBtn) {
            signupBtn.addEventListener('click', handleSignup);
        }
        if (backToWebsiteBtn) {
            backToWebsiteBtn.addEventListener('click', handleBackToWebsite);
        }
        
        // Message close
        messageClose.addEventListener('click', hideMessage);
        
        // Input validation
        setupInputValidation();
        
        // Keyboard shortcuts
        document.addEventListener('keydown', handleKeyDown);
    }
    
    function handleTabClick(event) {
        const targetTab = event.target.getAttribute('data-tab');
        if (targetTab) {
            switchTab(targetTab);
        }
    }
    
    function switchTab(targetTab) {
        // Remove active classes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        // Add active classes
        const activeButton = document.querySelector(`[data-tab="${targetTab}"]`);
        const activePanel = document.getElementById(`${targetTab}-panel`);
        
        if (activeButton && activePanel) {
            activeButton.classList.add('active');
            activePanel.classList.add('active');
        }
        
        // Clear messages and errors
        hideMessage();
        clearAllFieldErrors();
    }
    
    function handleCustomerSubmit(event) {
        event.preventDefault();
        
        const email = document.getElementById('customer-email').value.trim();
        const password = document.getElementById('customer-password').value.trim();
        const remember = document.getElementById('customer-remember').checked;
        
        if (validateCustomerForm(email, password)) {
            attemptLogin({
                type: 'customer',
                email: email,
                password: password,
                remember: remember
            });
        }
    }
    
    function handleStaffSubmit(event) {
        event.preventDefault();
        
        const username = document.getElementById('staff-username').value.trim();
        const password = document.getElementById('staff-password').value.trim();
        const remember = document.getElementById('staff-remember').checked;
        
        if (validateStaffForm(username, password)) {
            attemptLogin({
                type: 'staff',
                username: username,
                password: password,
                remember: remember
            });
        }
    }
    
    function validateCustomerForm(email, password) {
        let isValid = true;
        
        // Email validation
        if (!email) {
            setFieldError('customer-email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            setFieldError('customer-email', 'Please enter a valid email address');
            isValid = false;
        } else {
            clearFieldError('customer-email');
        }
        
        // Password validation
        if (!password) {
            setFieldError('customer-password', 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            setFieldError('customer-password', 'Password must be at least 6 characters');
            isValid = false;
        } else {
            clearFieldError('customer-password');
        }
        
        return isValid;
    }
    
    function validateStaffForm(username, password) {
        let isValid = true;
        
        // Username validation
        if (!username) {
            setFieldError('staff-username', 'Username is required');
            isValid = false;
        } else if (username.length < 3) {
            setFieldError('staff-username', 'Username must be at least 3 characters');
            isValid = false;
        } else {
            clearFieldError('staff-username');
        }
        
        // Password validation
        if (!password) {
            setFieldError('staff-password', 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            setFieldError('staff-password', 'Password must be at least 6 characters');
            isValid = false;
        } else {
            clearFieldError('staff-password');
        }
        
        return isValid;
    }
    
    function attemptLogin(credentials) {
        const submitBtn = document.querySelector('.tab-panel.active .btn--primary');
        if (!submitBtn) return;
        
        // Show loading state
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '🔄 Signing in...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Check demo credentials
            const isValid = checkCredentials(credentials);
            
            if (isValid) {
                showMessage('success', `✅ Welcome! Successfully logged in as ${credentials.type}.`);
                setTimeout(() => {
                    showMessage('info', '🎯 In a real app, you would be redirected to your dashboard.');
                }, 2500);
            } else {
                showMessage('error', '❌ Invalid credentials. Try demo@customer.com/demo123 or demo_staff/demo123');
            }
        }, 1500);
    }
    
    function checkCredentials(credentials) {
        const validCredentials = {
            customer: { email: 'demo@customer.com', password: 'demo123' },
            staff: { username: 'demo_staff', password: 'demo123' }
        };
        
        if (credentials.type === 'customer') {
            return credentials.email === validCredentials.customer.email && 
                   credentials.password === validCredentials.customer.password;
        } else if (credentials.type === 'staff') {
            return credentials.username === validCredentials.staff.username && 
                   credentials.password === validCredentials.staff.password;
        }
        
        return false;
    }
    
    function handleForgotPassword(type) {
        const message = type === 'customer' 
            ? '📧 Password reset instructions will be sent to your email address.'
            : '📧 Password reset instructions will be sent to your registered email.';
        showMessage('info', message);
    }
    
    function handleSignup() {
        showMessage('info', '🎉 Redirecting to customer registration...');
        setTimeout(() => {
            showMessage('success', 'In a real app, you would see the sign-up form here.');
        }, 2000);
    }
    
    function handleBackToWebsite() {
        showMessage('info', '🌐 Opening main website in new tab...');
        setTimeout(() => {
            window.open('https://new.maidsofcyfair.com/', '_blank');
        }, 1000);
    }
    
    function setupInputValidation() {
        // Real-time validation for all form inputs
        const inputs = document.querySelectorAll('.form-control');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateSingleField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this.id);
            });
        });
    }
    
    function validateSingleField(input) {
        const value = input.value.trim();
        const fieldType = input.type;
        const fieldId = input.id;
        
        if (fieldType === 'email') {
            if (!value) {
                setFieldError(fieldId, 'Email is required');
            } else if (!isValidEmail(value)) {
                setFieldError(fieldId, 'Please enter a valid email address');
            } else {
                clearFieldError(fieldId);
            }
        } else if (fieldType === 'password') {
            if (!value) {
                setFieldError(fieldId, 'Password is required');
            } else if (value.length < 6) {
                setFieldError(fieldId, 'Password must be at least 6 characters');
            } else {
                clearFieldError(fieldId);
            }
        } else if (fieldId.includes('username')) {
            if (!value) {
                setFieldError(fieldId, 'Username is required');
            } else if (value.length < 3) {
                setFieldError(fieldId, 'Username must be at least 3 characters');
            } else {
                clearFieldError(fieldId);
            }
        }
    }
    
    function setFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        if (!field) return;
        
        field.classList.add('error');
        
        // Remove existing error
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
    
    function clearFieldError(fieldId) {
        const field = document.getElementById(fieldId);
        if (!field) return;
        
        field.classList.remove('error');
        
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    function clearAllFieldErrors() {
        const errorFields = document.querySelectorAll('.form-control.error');
        errorFields.forEach(field => {
            clearFieldError(field.id);
        });
    }
    
    function showMessage(type, text) {
        if (!messageDisplay || !messageText) return;
        
        messageText.textContent = text;
        messageDisplay.className = `message-display ${type}`;
        
        // Auto-hide after 5 seconds
        setTimeout(hideMessage, 5000);
    }
    
    function hideMessage() {
        if (messageDisplay) {
            messageDisplay.classList.add('hidden');
        }
    }
    
    function handleKeyDown(event) {
        // Close message with Escape
        if (event.key === 'Escape' && !messageDisplay.classList.contains('hidden')) {
            hideMessage();
        }
        
        // Tab navigation with arrow keys
        if (event.target.classList.contains('tab-btn')) {
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                event.preventDefault();
                const tabs = Array.from(tabButtons);
                const currentIndex = tabs.indexOf(event.target);
                
                let nextIndex;
                if (event.key === 'ArrowRight') {
                    nextIndex = (currentIndex + 1) % tabs.length;
                } else {
                    nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                }
                
                tabs[nextIndex].click();
                tabs[nextIndex].focus();
            }
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function logInitializationInfo() {
        console.log('🏠 Maids of Cy-Fair Login System Initialized Successfully');
        console.log('Demo Credentials for Testing:');
        console.log('Customer Login: demo@customer.com / demo123');
        console.log('Staff Login: demo_staff / demo123');
        console.log('All interactive elements are now functional.');
    }
    
})();