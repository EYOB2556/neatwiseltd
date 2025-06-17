// Document ready function to ensure DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Add js-enabled class to body to enable animations
        document.body.classList.add('js-enabled');
        
        initializeEmailJS();
        initializeNavigation();
        setupScrollEffects();
        setupFormSubmission();
        setupSmoothScroll();
        setupAnimations();
    } catch (error) {
        console.error('Error initializing website functionality:', error);
    }
});

// Toggle Mobile Navigation
function initializeNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile navigation when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Active link highlighting based on scroll position
function setupScrollEffects() {
    window.addEventListener('scroll', () => {
        try {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-links a');
            
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        } catch (error) {
            console.error('Error in scroll effects:', error);
        }
    });
}

// EmailJS Configuration is loaded from emailjs-config.js

// Initialize EmailJS
function initializeEmailJS() {
    try {
        if (typeof emailjs !== 'undefined' && typeof EMAILJS_CONFIG !== 'undefined' && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY_HERE') {
            emailjs.init(EMAILJS_CONFIG.publicKey);
            console.log('EmailJS initialized successfully');
        } else {
            console.warn('EmailJS not configured. Please update the configuration in emailjs-config.js');
        }
    } catch (error) {
        console.error('Error initializing EmailJS:', error);
    }
}

// Form Submission with EmailJS
function setupFormSubmission() {
    const form = document.getElementById('quoteForm');
    const submitButton = form ? form.querySelector('button[type="submit"]') : null;

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            }

            try {
                // Get form values
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    service: document.getElementById('service').value,
                    message: document.getElementById('message').value
                };

                // Validate form data
                if (!formData.name || !formData.email || !formData.message) {
                    throw new Error('Please fill in all required fields');
                }

                // Check if EmailJS is configured
                if (typeof emailjs === 'undefined' || typeof EMAILJS_CONFIG === 'undefined' || EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY_HERE') {
                    // Fallback: Log data and show message (for demonstration)
                    console.log('Form data (EmailJS not configured):', formData);
                    throw new Error('Email service not configured. Please contact us directly.');
                }

                // Send email via EmailJS
                const response = await emailjs.send(
                    EMAILJS_CONFIG.serviceId,
                    EMAILJS_CONFIG.templateId,
                    {
                        from_name: formData.name,
                        from_email: formData.email,
                        phone: formData.phone,
                        service: formData.service,
                        message: formData.message,
                        to_email: EMAILJS_CONFIG.businessEmail
                    }
                );

                console.log('Email sent successfully:', response);
                
                // Display success message
                form.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Thank You!</h3>
                        <p>Your message has been sent successfully. We will get back to you within 24 hours!</p>
                        <button type="button" class="btn-primary" onclick="location.reload()">Send Another Message</button>
                    </div>
                `;

            } catch (error) {
                console.error('Error in form submission:', error);
                
                // Reset button state
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerHTML = 'Send Message';
                }
                
                // Display error message
                const errorMessage = error.message || 'Something went wrong. Please try again later or contact us directly.';
                
                // Create error display without replacing entire form
                let errorDiv = form.querySelector('.error-message');
                if (!errorDiv) {
                    errorDiv = document.createElement('div');
                    errorDiv.className = 'error-message';
                    form.insertBefore(errorDiv, form.firstChild);
                }
                
                errorDiv.innerHTML = `
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Oops!</h3>
                    <p>${errorMessage}</p>
                    <p><strong>Phone:</strong> +44 123 456 7890 | <strong>Email:</strong> info@neatwiseltd.co.uk</p>
                `;

                // Remove error message after 10 seconds
                setTimeout(() => {
                    if (errorDiv && errorDiv.parentNode) {
                        errorDiv.remove();
                    }
                }, 10000);
            }
        });
    }
}

// Smooth scroll for anchor links
function setupSmoothScroll() {
    try {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    } catch (error) {
        console.error('Error in smooth scroll setup:', error);
    }
}

// Add animation on scroll
function setupAnimations() {
    try {
        const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .info-card');
        
        if (animatedElements.length === 0 || !window.IntersectionObserver) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    } catch (error) {
        console.error('Error in animation setup:', error);
        // If animations fail, make all elements visible
        document.querySelectorAll('.service-card, .testimonial-card, .info-card').forEach(el => {
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
        });
    }
} 