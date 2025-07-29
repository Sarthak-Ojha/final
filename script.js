// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Main initialization function
function initializePortfolio() {
    // Initialize all components
    initializeNavigation();
    initializeAnimations();
    initializeScrollEffects();
    initializeLoadingScreen();
    initializeTypingEffect();
    initializeSmoothScrolling();
    initializeBackToTop();
    initializeMobileMenu();
    initializeParallax();
    initializeProjectCards();
    initializeCredentialCards();
    initializeSkillsAnimation();
    initializeEnhancedLogoScroller(); // Enhanced version
    initializeRevealAnimations();
    optimizePerformance();
}

// Navigation functionality
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add scrolled class to navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Loading screen
function initializeLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'visible';
            // Remove loading screen after animation
            setTimeout(() => {
                if (loadingScreen) {
                    loadingScreen.remove();
                }
            }, 500);
        }, 1000);
    });
    // Hide body overflow during loading
    document.body.style.overflow = 'hidden';
}

// Typing effect for hero title
function initializeTypingEffect() {
    const titleMain = document.querySelector('.title-main');
    const titleSub = document.querySelector('.title-sub');
    
    if (!titleMain || !titleSub) return;
    
    const mainText = titleMain.textContent;
    const subText = titleSub.textContent;
    
    // Clear initial text
    titleMain.textContent = '';
    titleSub.textContent = '';
    
    // Type main title first
    typeText(titleMain, mainText, 50, () => {
        // Then type subtitle
        setTimeout(() => {
            typeText(titleSub, subText, 30);
        }, 200);
    });
}

function typeText(element, text, speed, callback) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            if (callback) callback();
        }
    }, speed);
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
}

// Enhanced Mobile menu functionality with accessibility
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!hamburger || !navMenu) return;

    // Focus trap elements
    const focusableElements = navMenu.querySelectorAll(
        'a[href], button, textarea, input, select'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    hamburger.addEventListener('click', () => {
        const isActive = hamburger.classList.contains('active');
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        if (!isActive) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            
            // Focus first menu item when opened
            if (firstFocusable) {
                setTimeout(() => firstFocusable.focus(), 100);
            }
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Tab key navigation within mobile menu (Focus trap)
    navMenu.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && navMenu.classList.contains('active')) {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        const bars = hamburger.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
}

// Scroll animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll(`
        .highlight-item,
        .skill-category,
        .project-card,
        .credential-card,
        .contact-card
    `);

    animatedElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
}

// Scroll effects
function initializeScrollEffects() {
    let ticking = false;

    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        
        // Parallax effect for hero background
        const heroParticles = document.querySelector('.hero-particles');
        if (heroParticles) {
            heroParticles.style.transform = `translateY(${scrolled * 0.5}px)`;
        }

        // Parallax effect for code editor
        const codeEditor = document.querySelector('.code-editor');
        if (codeEditor) {
            codeEditor.style.transform = `translateY(${scrolled * 0.2}px)`;
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
}

// Parallax effects
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.code-editor');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.3;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Back to top button
function initializeBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    if (!backToTopButton) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Project card interactions
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Credential cards interactions
function initializeCredentialCards() {
    const credentialCards = document.querySelectorAll('.credential-card');
    
    credentialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.01)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Skills animation
function initializeSkillsAnimation() {
    const skillTags = document.querySelectorAll('.skill-tag, .tech-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-4px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ENHANCED Logo scroller functionality with auto-scroll
function initializeEnhancedLogoScroller() {
    const logoScroller = document.querySelector('.logo-scroller');
    if (!logoScroller) return;

    // Duplicate logos for seamless loop if not already done
    const logoItems = logoScroller.innerHTML;
    if (logoScroller.children.length < 10) { // Check if not already duplicated
        logoScroller.innerHTML = logoItems + logoItems;
    }

    // Auto-scroll functionality
    let scrollAmount = 0;
    let isUserInteracting = false;
    let animationId;

    function autoScroll() {
        if (!isUserInteracting) {
            scrollAmount += 0.5; // Adjust speed here
            logoScroller.scrollLeft = scrollAmount;

            // Reset when reaching halfway point (seamless loop)
            if (scrollAmount >= logoScroller.scrollWidth / 2) {
                scrollAmount = 0;
            }
        }
        animationId = requestAnimationFrame(autoScroll);
    }

    // Start auto-scroll
    autoScroll();

    // Pause auto-scroll on hover
    logoScroller.addEventListener('mouseenter', () => {
        isUserInteracting = true;
        logoScroller.style.cursor = 'grab';
    });

    logoScroller.addEventListener('mouseleave', () => {
        isUserInteracting = false;
        logoScroller.style.cursor = 'default';
    });

    // Manual scrolling with mouse drag
    let isDown = false;
    let startX;
    let scrollLeft;

    logoScroller.addEventListener('mousedown', (e) => {
        isDown = true;
        isUserInteracting = true;
        logoScroller.classList.add('active');
        startX = e.pageX - logoScroller.offsetLeft;
        scrollLeft = logoScroller.scrollLeft;
        logoScroller.style.cursor = 'grabbing';
    });

    logoScroller.addEventListener('mouseleave', () => {
        isDown = false;
        logoScroller.classList.remove('active');
        logoScroller.style.cursor = 'default';
        setTimeout(() => {
            isUserInteracting = false;
        }, 1000); // Resume auto-scroll after 1 second
    });

    logoScroller.addEventListener('mouseup', () => {
        isDown = false;
        logoScroller.classList.remove('active');
        logoScroller.style.cursor = 'grab';
        setTimeout(() => {
            isUserInteracting = false;
        }, 1000); // Resume auto-scroll after 1 second
    });

    logoScroller.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - logoScroller.offsetLeft;
        const walk = (x - startX) * 2;
        logoScroller.scrollLeft = scrollLeft - walk;
        scrollAmount = logoScroller.scrollLeft; // Sync with auto-scroll
    });

    // Touch support for mobile
    let startTouchX;
    let startScrollLeft;

    logoScroller.addEventListener('touchstart', (e) => {
        isUserInteracting = true;
        startTouchX = e.touches[0].pageX;
        startScrollLeft = logoScroller.scrollLeft;
    }, { passive: true });

    logoScroller.addEventListener('touchmove', (e) => {
        if (!startTouchX) return;
        const x = e.touches[0].pageX;
        const walk = (startTouchX - x) * 2;
        logoScroller.scrollLeft = startScrollLeft + walk;
        scrollAmount = logoScroller.scrollLeft; // Sync with auto-scroll
    }, { passive: true });

    logoScroller.addEventListener('touchend', () => {
        startTouchX = null;
        setTimeout(() => {
            isUserInteracting = false;
        }, 2000); // Resume auto-scroll after 2 seconds on mobile
    }, { passive: true });

    // Pause animation when page is not visible (performance optimization)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            autoScroll();
        }
    });

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        cancelAnimationFrame(animationId);
        logoScroller.style.animation = 'none';
    }
}

// Enhanced smooth reveal animations with stagger
function initializeRevealAnimations() {
    const revealElements = document.querySelectorAll('.section-title, .section-subtitle');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); // Staggered animation
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        revealObserver.observe(element);
    });
}

// Enhanced performance optimizations
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Scroll-dependent operations here
        }, 10);
    });

    // Preload critical images
    const criticalImages = ['/images/rental.png', '/images/gear.png', '/images/quiz.png'];
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Lazy loading for non-critical content
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    }
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio error:', e.error);
});

// Console welcome message
console.log(`
🚀 Welcome to Sarthak Ojha's portfolio!
Built with modern web technologies
Feel free to explore the code!

Connect with me:
📧 sarthakojha.works@gmail.com
🐱 GitHub: /sarthakojha
💼 LinkedIn: /in/sarthakojha
🌍 Location: Nepal

Built with ❤️ using HTML, CSS, and JavaScript
`);

// Additional utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Smooth scroll to section function
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Enhanced keyboard navigation support
document.addEventListener('keydown', (e) => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        if (hamburger && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    }

    // Arrow key navigation for sections (optional)
    if (e.ctrlKey || e.metaKey) {
        const sections = ['home', 'about', 'projects', 'credentials', 'contact'];
        const currentSection = getCurrentSection();
        const currentIndex = sections.indexOf(currentSection);
        
        if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
            e.preventDefault();
            scrollToSection(`#${sections[currentIndex + 1]}`);
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            scrollToSection(`#${sections[currentIndex - 1]}`);
        }
    }
});

// Helper function to get current section
function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    let current = 'home';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    return current;
}

// Add resize handler for responsive adjustments
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize to larger screens
    if (window.innerWidth > 768) {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    }
}, 250));

// Intersection Observer for viewport-based animations
const createViewportObserver = (callback, options = {}) => {
    const defaultOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    return new IntersectionObserver(callback, { ...defaultOptions, ...options });
};

// Initialize viewport-based features
function initializeViewportFeatures() {
    // Pause animations when not in viewport for performance
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const animationObserver = createViewportObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            } else {
                entry.target.style.animationPlayState = 'paused';
            }
        });
    });

    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
}
// Enhanced Back to Top Button functionality
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('backToTop');
    const progressCircle = document.querySelector('.progress-ring-circle');
    
    // Calculate the circumference for progress animation
    const radius = progressCircle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    
    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = circumference;
    
    // Show/hide button and update progress on scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        
        // Show button when scrolled down 300px
        if (scrollTop > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
        
        // Update progress ring
        const offset = circumference - (scrollProgress / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
    });
    
    // Smooth scroll to top with easing
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add click animation
        this.style.transform = 'translateY(-2px) scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Alternative smooth scroll with custom easing (if you prefer)
        /*
        const scrollToTop = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 0) {
                window.scrollTo(0, scrollTop - scrollTop / 8);
                requestAnimationFrame(scrollToTop);
            }
        };
        scrollToTop();
        */
    });
    
    // Add keyboard accessibility
    backToTopBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

// Call viewport features initialization
initializeViewportFeatures();
