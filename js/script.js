// Training Portal JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Sticky Header
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 0 rgba(0, 0, 0, 0.05)';
        }
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - header.offsetHeight,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('nav ul li a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Course Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide courses based on filter
            courseCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else if (card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Form Submission
    const contactForm = document.querySelector('.contact-form form');
    const newsletterForm = document.querySelector('.footer-newsletter form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                // Show success message
                const formGroups = this.querySelectorAll('.form-group');
                formGroups.forEach(group => {
                    group.style.display = 'none';
                });
                
                submitButton.style.display = 'none';
                
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--success-color); margin-bottom: 1rem;"></i>
                    <h3>Thank You!</h3>
                    <p>Your message has been sent successfully. We'll get back to you shortly.</p>
                `;
                
                this.appendChild(successMessage);
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    formGroups.forEach(group => {
                        group.style.display = 'block';
                    });
                    
                    submitButton.style.display = 'inline-block';
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                    successMessage.remove();
                    this.reset();
                }, 5000);
            }, 1500);
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Subscribing...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <p style="color: white; margin: 0;">Thank you for subscribing!</p>
                `;
                
                emailInput.style.display = 'none';
                submitButton.style.display = 'none';
                
                this.appendChild(successMessage);
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    emailInput.style.display = 'block';
                    submitButton.style.display = 'inline-block';
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                    successMessage.remove();
                    this.reset();
                }, 5000);
            }, 1500);
        });
    }
    
    // Navigation active state based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    function highlightNavLink() {
        const scrollPosition = window.scrollY + header.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // If at the top of the page, highlight the home link
        if (scrollPosition < sections[0].offsetTop) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#') {
                    link.classList.add('active');
                }
            });
        }
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Initial call to set active nav link
    highlightNavLink();
    
    // Animation on Scroll (Simple Implementation)
    function animateOnScroll() {
        const elements = document.querySelectorAll('.course-card, .about-content, .contact-content, .stat-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.8) {
                element.classList.add('fade-in');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
});
