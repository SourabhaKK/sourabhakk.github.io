// ===================================
// Navigation Functionality
// ===================================

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('.section');
const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    if (section.id) {
        sectionObserver.observe(section);
    }
});

// ===================================
// Smooth Scrolling
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navHeight = nav.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Scroll Animations
// ===================================

const animateOnScroll = () => {
    const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', animateOnScroll);

// ===================================
// Hero Background Animation
// ===================================

const createParticles = () => {
    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground) return;
    
    // Create animated gradient orbs
    for (let i = 0; i < 3; i++) {
        const orb = document.createElement('div');
        orb.style.position = 'absolute';
        orb.style.borderRadius = '50%';
        orb.style.pointerEvents = 'none';
        
        const size = Math.random() * 300 + 200;
        orb.style.width = `${size}px`;
        orb.style.height = `${size}px`;
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        orb.style.left = `${x}%`;
        orb.style.top = `${y}%`;
        
        const hue = Math.random() > 0.5 ? 210 : 190; // Blue or cyan
        orb.style.background = `radial-gradient(circle, hsla(${hue}, 80%, 60%, 0.15) 0%, transparent 70%)`;
        
        orb.style.animation = `float ${8 + Math.random() * 4}s ease-in-out infinite`;
        orb.style.animationDelay = `${Math.random() * 2}s`;
        
        heroBackground.appendChild(orb);
    }
};

// Add floating animation keyframes dynamically
const addFloatAnimation = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0.3;
            }
            25% {
                transform: translate(20px, -20px) scale(1.1);
                opacity: 0.5;
            }
            50% {
                transform: translate(-20px, 20px) scale(0.9);
                opacity: 0.4;
            }
            75% {
                transform: translate(20px, 20px) scale(1.05);
                opacity: 0.5;
            }
        }
    `;
    document.head.appendChild(style);
};

// Initialize hero animations
document.addEventListener('DOMContentLoaded', () => {
    addFloatAnimation();
    createParticles();
});

// ===================================
// Card Hover Effects Enhancement
// ===================================

const enhanceCardHovers = () => {
    const cards = document.querySelectorAll('.card, .project-card, .skill-category, .mindset-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
    });
};

// Initialize card effects
document.addEventListener('DOMContentLoaded', enhanceCardHovers);

// ===================================
// Button Ripple Effect
// ===================================

const createRipple = (event) => {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    const rect = button.getBoundingClientRect();
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    ripple.classList.add('ripple');
    
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }
    
    button.appendChild(ripple);
};

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Add ripple styles
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// ===================================
// Typing Effect for Hero Subtitle (Optional Enhancement)
// ===================================

const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    
    type();
};

// Optional: Uncomment to enable typing effect
// document.addEventListener('DOMContentLoaded', () => {
//     const subtitle = document.querySelector('.hero-subtitle');
//     if (subtitle) {
//         const originalText = subtitle.textContent;
//         typeWriter(subtitle, originalText, 80);
//     }
// });

// ===================================
// Performance Optimization
// ===================================

// Debounce function for scroll events
const debounce = (func, wait = 10) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Optimize scroll listeners
window.addEventListener('scroll', debounce(() => {
    // Any additional scroll-based logic can go here
}, 10));

// ===================================
// Lazy Loading for Future Images
// ===================================

const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

document.addEventListener('DOMContentLoaded', lazyLoadImages);

// ===================================
// Accessibility Enhancements
// ===================================

// Keyboard navigation for cards
document.addEventListener('DOMContentLoaded', () => {
    const focusableCards = document.querySelectorAll('.project-card, .skill-category, .mindset-item');
    
    focusableCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const link = card.querySelector('a');
                if (link) {
                    link.click();
                }
            }
        });
    });
});

// ===================================
// Console Easter Egg
// ===================================

console.log('%c👋 Hello, fellow developer!', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out the repository!', 'color: #06b6d4; font-size: 14px;');
console.log('%chttps://github.com/SourabhaKK', 'color: #60a5fa; font-size: 12px;');

// ===================================
// Analytics Placeholder
// ===================================

// Add your analytics tracking code here
// Example: Google Analytics, Plausible, etc.

const trackPageView = () => {
    // Placeholder for analytics
    console.log('Page view tracked');
};

const trackEvent = (category, action, label) => {
    // Placeholder for event tracking
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
};

// Track initial page load
document.addEventListener('DOMContentLoaded', trackPageView);

// Track project link clicks
document.addEventListener('DOMContentLoaded', () => {
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', () => {
            const projectTitle = link.closest('.project-card').querySelector('.project-title').textContent;
            trackEvent('Projects', 'Click', projectTitle);
        });
    });
});
