document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    initializeNavigation();
    initializeAnimations();
    initializeTypingEffect();
    initializeSmoothScrolling();
    initializeBackToTop();
    initializeMobileMenu();
    initializeScrollEffects();
    initializeLogoScroller();
    initializeRevealAnimations();
    initializeTouchSupport();
    initializeViewportOptimizations();
}

// Enhanced navigation with mobile optimization
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    let scrollTimeout;

    // Throttled scroll event for better mobile performance
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, 10);
    }, { passive: true });

    // Active navigation highlighting with improved mobile detection
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
}

// Enhanced mobile menu with touch support
function initializeMobileMenu() {
    const hamburger = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    if (!hamburger || !navMenu) return;

    // Improved touch handling for mobile menu
    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        const isActive = hamburger.classList.contains('active');
        
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Prevent body scrolling when menu is open
        if (!isActive) {
            body.style.overflow = 'hidden';
            body.style.position = 'fixed';
            body.style.top = `-${window.scrollY}px`;
            body.style.width = '100%';
        } else {
            const scrollY = body.style.top;
            body.style.position = '';
            body.style.top = '';
            body.style.overflow = '';
            body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }

        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        if (!isActive) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Close menu when clicking outside (touch-friendly)
    document.addEventListener('touchstart', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    }, { passive: true });

    // Close menu with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Restore body scrolling
        const scrollY = body.style.top;
        body.style.position = '';
        body.style.top = '';
        body.style.overflow = '';
        body.style.width = '';
        if (scrollY) {
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
        
        const bars = hamburger.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }

    // Auto-close on window resize
    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    }, 250));
}

// Touch support for interactive elements
function initializeTouchSupport() {
    const interactiveElements = document.querySelectorAll('.project-card, .credential-card, .highlight-item, .skill-category, .contact-card');
    
    interactiveElements.forEach(element => {
        let touchStartY = 0;
        let touchStartTime = 0;
        
        element.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
            touchStartTime = Date.now();
            element.style.transform = 'translateY(-2px) scale(1.01)';
        }, { passive: true });

        element.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const touchDuration = Date.now() - touchStartTime;
            const touchDistance = Math.abs(touchEndY - touchStartY);
            
            // Only trigger if it was a tap (not a scroll)
            if (touchDistance < 10 && touchDuration < 500) {
                element.style.transform = 'translateY(-4px) scale(1.02)';
                setTimeout(() => {
                    element.style.transform = '';
                }, 150);
            } else {
                element.style.transform = '';
            }
        }, { passive: true });

        element.addEventListener('touchcancel', () => {
            element.style.transform = '';
        }, { passive: true });
    });
}

// Viewport-based optimizations for mobile performance
function initializeViewportOptimizations() {
    // Intersection Observer with enhanced mobile settings
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements with improved mobile performance
    const animatedElements = document.querySelectorAll(`
        .highlight-item,
        .skill-category,
        .project-card,
        .credential-card,
        .contact-card,
        .social-link
    `);

    animatedElements.forEach((element, index) => {
        element.classList.add('fade-in');
        // Reduced delay for mobile
        element.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(element);
    });
}

// Typing effect with mobile optimization
function initializeTypingEffect() {
    const titleMain = document.querySelector('.title-main');
    const titleSub = document.querySelector('.title-sub');
    
    if (!titleMain || !titleSub) return;

    const mainText = titleMain.textContent;
    const subText = titleSub.textContent;

    titleMain.textContent = '';
    titleSub.textContent = '';

    // Faster typing speed for mobile
    const isMobile = window.innerWidth <= 768;
    const mainSpeed = isMobile ? 30 : 50;
    const subSpeed = isMobile ? 20 : 30;

    typeText(titleMain, mainText, mainSpeed, () => {
        setTimeout(() => {
            typeText(titleSub, subText, subSpeed);
        }, 100);
    });

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
}

// Enhanced smooth scrolling with mobile optimization
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - (window.innerWidth <= 768 ? 60 : 70);
                
                // Use native smooth scrolling with fallback
                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                } else {
                    // Fallback for older mobile browsers
                    smoothScrollTo(offsetTop, 800);
                }
            }
        });
    });
    
    // Smooth scroll fallback function
    function smoothScrollTo(endY, duration) {
        const startY = window.scrollY;
        const distanceY = endY - startY;
        const startTime = new Date().getTime();

        const easeInOutQuart = (time, from, distance, duration) => {
            if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
            return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
        };

        const timer = setInterval(() => {
            const time = new Date().getTime() - startTime;
            const newY = easeInOutQuart(time, startY, distanceY, duration);
            if (time >= duration) {
                clearInterval(timer);
            }
            window.scrollTo(0, newY);
        }, 1000 / 60);
    }
}

// Enhanced back to top with mobile optimization
function initializeBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    const progressCircle = document.querySelector('.progress-ring-circle');
    
    if (!backToTopButton || !progressCircle) return;

    // Calculate circumference for progress animation
    const radius = progressCircle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = circumference;

    let scrollTimeout;
    
    // Throttled scroll event for better mobile performance
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollProgress = (scrollTop / scrollHeight) * 100;

            // Show button after scrolling 200px on mobile, 300px on desktop
            const showThreshold = window.innerWidth <= 768 ? 200 : 300;
            
            if (scrollTop > showThreshold) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }

            // Update progress ring
            const offset = circumference - (scrollProgress / 100) * circumference;
            progressCircle.style.strokeDashoffset = offset;
        }, 10);
    }, { passive: true });

    // Enhanced click animation and smooth scroll
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Click animation
        backToTopButton.style.transform = 'translateY(-2px) scale(0.95)';
        setTimeout(() => {
            backToTopButton.style.transform = '';
        }, 150);

        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Touch support for back to top
    backToTopButton.addEventListener('touchstart', () => {
        backToTopButton.style.transform = 'translateY(-1px) scale(0.98)';
    }, { passive: true });
    
    backToTopButton.addEventListener('touchend', () => {
        setTimeout(() => {
            backToTopButton.style.transform = '';
        }, 100);
    }, { passive: true });
}

// Enhanced scroll effects with mobile performance
function initializeScrollEffects() {
    let ticking = false;

    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        
        const codeEditor = document.querySelector('.code-editor');
        if (codeEditor && window.innerWidth > 768) { // Only on desktop
            codeEditor.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
        
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }, { passive: true });
}

// Enhanced logo scroller with better mobile support
function initializeLogoScroller() {
    const logoScroller = document.querySelector('.logo-scroller');
    if (!logoScroller) return;

    // Auto-scroll functionality with mobile optimization
    let scrollAmount = 0;
    let isUserInteracting = false;
    let animationId;
    const isMobile = window.innerWidth <= 768;

    function autoScroll() {
        if (!isUserInteracting && document.visibilityState === 'visible') {
            scrollAmount += isMobile ? 0.3 : 0.5; // Slower on mobile
            logoScroller.scrollLeft = scrollAmount;

            // Reset for seamless loop
            if (scrollAmount >= logoScroller.scrollWidth / 2) {
                scrollAmount = 0;
            }
        }
        animationId = requestAnimationFrame(autoScroll);
    }

    // Start auto-scroll
    autoScroll();

    // Enhanced interaction handling for mobile
    logoScroller.addEventListener('touchstart', () => {
        isUserInteracting = true;
    }, { passive: true });

    logoScroller.addEventListener('touchend', () => {
        setTimeout(() => {
            isUserInteracting = false;
        }, 2000); // Resume auto-scroll after 2 seconds on mobile
    }, { passive: true });

    // Desktop mouse events
    if (!isMobile) {
        logoScroller.addEventListener('mouseenter', () => {
            isUserInteracting = true;
        });

        logoScroller.addEventListener('mouseleave', () => {
            isUserInteracting = false;
        });
    }

    // Pause animation when page is not visible (performance optimization)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            autoScroll();
        }
    });

    // Handle orientation change on mobile
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            scrollAmount = logoScroller.scrollLeft;
        }, 100);
    });
}

// Other functions remain the same...
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(`
        .highlight-item,
        .skill-category,
        .project-card,
        .credential-card,
        .contact-card,
        .social-link
    `);

    animatedElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(element);
    });
}

function initializeRevealAnimations() {
    const revealElements = document.querySelectorAll('.section-title, .section-subtitle, .section-tag');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        revealObserver.observe(element);
    });
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
