// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Initialize EmailJS with your Public Key
(function() {
    // STEP 1: Replace 'YOUR_PUBLIC_KEY' with your actual Public Key from your EmailJS account.
    // Find this in your EmailJS dashboard -> Account.
    // It will look something like: 'AbCDeFg123hIjKLMn'
    // THIS IS NOT YOUR EMAIL ADDRESS. It is a key from the EmailJS website.
    // --- PASTE THE KEY YOU COPIED FROM THE EMAILJS WEBSITE INSIDE THE QUOTES BELOW ---
    // Example: emailjs.init('AbCDeFg123hIjKLMn');
    // The line below is causing the error. Replace 'YOUR_PUBLIC_KEY' with the key you just copied.
    emailjs.init('g3KfiXDBS9YJFGDso'); 
})();


// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // Animate only once
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.about-text, .about-details, .skill-group, .project-card-new, .internship-card, .contact-form-new, .contact-info-new');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// --- Skills Section Animation ---
const skillGroups = document.querySelectorAll('.skill-group');

const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillItems = entry.target.querySelectorAll('.skill-item');
            skillItems.forEach((item, index) => {
                // Apply a staggered delay to each item
                item.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            });
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, { threshold: 0.2 });

skillGroups.forEach(group => {
    skillsObserver.observe(group);
});

// --- Hero Section Aurora Effect ---
const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        heroSection.style.setProperty('--x', `${x}px`);
        heroSection.style.setProperty('--y', `${y}px`);
    });
}

// Aurora hover effect for project cards
document.querySelectorAll('.project-card-new').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element.
        const y = e.clientY - rect.top;  // y position within the element.
        
        this.style.setProperty('--x', `${x}px`);
        this.style.setProperty('--y', `${y}px`);
    });
});

// Project Filtering Logic
const filterContainer = document.querySelector('.project-filter');
const projectCardNodes = document.querySelectorAll('.project-card-new');

if (filterContainer) {
    filterContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            // Deactivate existing active button
            filterContainer.querySelector('.active').classList.remove('active');
            // Activate new button
            e.target.classList.add('active');

            const filterValue = e.target.getAttribute('data-filter');

            projectCardNodes.forEach(card => {
                if (card.dataset.category === filterValue || filterValue === 'all') {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        }
    });
}

// --- Project Modal Logic ---
const modal = document.getElementById('project-modal');
const modalCloseBtn = document.querySelector('.modal-close');

projectCardNodes.forEach(card => {
    card.addEventListener('click', () => {
        // Get data from the clicked card's data attributes
        const title = card.dataset.title;
        const imgSrc = card.dataset.img;
        const description = card.dataset.description;
        const techHtml = card.querySelector('.project-tech-new').innerHTML;
        const linksHtml = card.querySelector('.project-links-new').innerHTML;

        // Populate the modal
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-img').src = imgSrc;
        document.getElementById('modal-description').textContent = description;
        document.getElementById('modal-tech').innerHTML = techHtml;
        document.getElementById('modal-links').innerHTML = linksHtml;

        // Show the modal
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    // Add keyboard accessibility
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            card.click();
        }
    });
});

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

if (modal) {
    // Close modal when the 'x' is clicked
    modalCloseBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside the content area
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with the 'Escape' key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}


// Form validation and submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formMessages = document.getElementById('form-messages');

        // --- Form Validation ---
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill out all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        // If validation passes, hide any previous messages
        formMessages.style.display = 'none';

        // Show loading state
        const submitBtn = document.getElementById('submitBtn');
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            <span>Sending...</span>
        `;
        submitBtn.disabled = true;

        // --- EmailJS Configuration - THIS IS THE IMPORTANT PART ---
        // The recipient email (kalpeshdesale570@gmail.com) is set inside your EmailJS template on their website.

        // STEP 2: Replace 'YOUR_SERVICE_ID' with the ID of the email service you created in EmailJS.
        // Find this in your EmailJS dashboard -> Email Services.
        // It will look something like: 'service_abc123'
        const serviceID = 'service_co1817v'; 

        // STEP 3: Replace 'YOUR_TEMPLATE_ID' with the ID of the email template you created.
        // Find this in your EmailJS dashboard -> Email Templates.
        // It will look something like: 'template_xyz456'
        const templateID = 'template_uey4xma'; 

        emailjs.sendForm(serviceID, templateID, this)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                this.reset();
                // Show success message in the form
                showFormMessage('Thank you for your message!', 'success');
            }, (error) => {
                console.error('FAILED...', error);
                // Show a more specific error message directly from EmailJS
                const errorMessage = `Failed to send. Error: ${error.text || 'Please check console for details.'}`;
                showNotification(errorMessage, 'error');
            })
            .finally(() => {
                submitBtn.innerHTML = originalBtnContent;
                submitBtn.disabled = false;
            });
    });
}

// Function to show messages within the form
function showFormMessage(message, type) {
    const formMessages = document.getElementById('form-messages');
    formMessages.textContent = message;
    formMessages.style.display = 'block';

    if (type === 'success') {
        formMessages.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
        formMessages.style.color = '#047857';
    } else if (type === 'error') {
        formMessages.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        formMessages.style.color = '#b91c1c';
    }
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#10b981';
            break;
        case 'error':
            notification.style.background = '#ef4444';
            break;
        default:
            notification.style.background = '#6366f1';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background: #6366f1;
    color: white;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

document.body.appendChild(scrollToTopBtn);

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to scroll to top button
scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.background = '#fbbf24';
    scrollToTopBtn.style.color = '#1f2937';
    scrollToTopBtn.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.background = '#6366f1';
    scrollToTopBtn.style.color = 'white';
    scrollToTopBtn.style.transform = 'scale(1)';
});

// Project button click handler
function handleProjectClick(type, projectName) {
    // This function is for placeholder buttons and shows a notification.

    if (type === 'demo') {
        showNotification(`🚀 ${projectName} - Live demo coming soon!`, 'info');
    } else if (type === 'github') {
        showNotification(`🔗 ${projectName} - GitHub repository coming soon!`, 'info');
    }
}

// --- Consolidated Scroll Handler for Performance ---
let isTicking = false;

function handleScroll() {
    const scrolled = window.pageYOffset;
    
    // Navbar background
    const navbar = document.querySelector('.navbar');
    if (scrolled > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrolled >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Show/hide scroll to top button
    if (scrolled > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }

    isTicking = false;
}

window.addEventListener('scroll', () => {
    if (!isTicking) {
        window.requestAnimationFrame(handleScroll);
        isTicking = true;
    }
});

// Add CSS for active nav link
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .navbar.scrolled {
        background: rgba(31, 41, 55, 0.95); /* --bg-card with transparency */
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }
    .nav-link.active {
        color: #6366f1 !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(dynamicStyles);

// --- Internship Tabs Logic ---
const internshipTabsContainer = document.querySelector('.internship-tabs');
if (internshipTabsContainer) {
    internshipTabsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('internship-tab-btn')) {
            const targetId = e.target.dataset.target;
            const targetContent = document.getElementById(targetId);

            // Update buttons
            internshipTabsContainer.querySelector('.active').classList.remove('active');
            e.target.classList.add('active');

            // Update content
            const allContent = document.querySelectorAll('.internship-content');
            allContent.forEach(content => {
                content.classList.remove('active');
            });
            targetContent.classList.add('active');
        }
    });
}
