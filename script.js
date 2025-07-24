// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const contactForm = document.getElementById('contact-form');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.parentElement.classList.add('scrolled');
        } else {
            navbar.parentElement.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission - now handled by FormSubmit service
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // No need to prevent default as we want the form to submit normally
            // Just do client-side validation before submission
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !message) {
                e.preventDefault();
                showFormMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Show sending message
            showFormMessage('Sending...', 'info');
            // Form will be submitted to FormSubmit service
        });
    }
    
    // Function to show form submission messages
    function showFormMessage(message, type) {
        // Remove any existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message element
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        
        // Add to DOM
        contactForm.appendChild(messageElement);
        
        // Remove after 5 seconds if it's a success or error message
        if (type === 'success' || type === 'error') {
            setTimeout(() => {
                messageElement.remove();
            }, 5000);
        }
    }
    
    // Add animation to elements when they come into view
    const observerOptions = {
        threshold: 0.25
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    document.querySelectorAll('.project-card, .skill-tag, .about-text, .contact-form').forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .project-card, .skill-tag, .about-text, .contact-form {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .project-card.animate, .skill-tag.animate, .about-text.animate, .contact-form.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .skill-tag {
            transition-delay: calc(0.1s * var(--i, 0));
        }
        
        .form-message {
            padding: 10px;
            margin-top: 15px;
            border-radius: 5px;
            text-align: center;
        }
        
        .form-message.success {
            background-color: #d1fae5;
            color: #065f46;
        }
        
        .form-message.error {
            background-color: #fee2e2;
            color: #b91c1c;
        }
        
        .form-message.info {
            background-color: #e0f2fe;
            color: #0369a1;
        }
    `;
    document.head.appendChild(style);
    
    // Add delay to skill tags for staggered animation
    document.querySelectorAll('.skill-tag').forEach((tag, index) => {
        tag.style.setProperty('--i', index);
    });
});