// Document ready function to ensure DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Add js-enabled class to body to enable animations
        document.body.classList.add('js-enabled');
        
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

// Form Submission
function setupFormSubmission() {
    const form = document.getElementById('quoteForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            try {
                e.preventDefault();
                
                // Get form values
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                const service = document.getElementById('service').value;
                const message = document.getElementById('message').value;
                
                // Here you would normally send this data to a server
                // For demo purposes, we'll just log it and show a success message
                console.log({ name, email, phone, service, message });
                
                // Display success message
                form.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Thank You!</h3>
                        <p>Your message has been sent successfully. We will get back to you soon!</p>
                    </div>
                `;
            } catch (error) {
                console.error('Error in form submission:', error);
                form.innerHTML = `
                    <div class="error-message">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h3>Oops!</h3>
                        <p>Something went wrong. Please try again later or contact us directly.</p>
                    </div>
                `;
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