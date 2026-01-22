// ============================================
// YACHAY FORESTAL - INTERACTIVE JAVASCRIPT
// ============================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {

    // === NAVIGATION ===
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');

        // Animate hamburger
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        });
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS ===
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // === SERVICE CARDS INTERACTION ===
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            // Add pulse effect to icon
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.animation = 'none';
                setTimeout(() => {
                    icon.style.animation = 'pulse 0.5s ease';
                }, 10);
            }
        });
    });

    // === DYNAMIC BACKGROUND PARTICLES ===
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5 + 2}px;
            height: ${Math.random() * 5 + 2}px;
            background: rgba(122, 179, 66, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            pointer-events: none;
        `;
        return particle;
    }

    // Add some floating particles to hero
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                heroBackground.appendChild(createParticle());
            }, i * 200);
        }
    }

    // === SCROLL PROGRESS INDICATOR ===
    function updateScrollProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;

        // You can add a progress bar if desired
        // For now, we'll use this to add dynamic effects
        if (scrolled > 20) {
            document.body.classList.add('scrolled-page');
        } else {
            document.body.classList.remove('scrolled-page');
        }
    }

    window.addEventListener('scroll', updateScrollProgress);

    // === WORK CARDS SEQUENTIAL ANIMATION ===
    const workCards = document.querySelectorAll('.work-card');

    const workObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateX(-30px)';
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, 50);
                }, index * 100);
            }
        });
    }, {
        threshold: 0.2
    });

    workCards.forEach(card => {
        workObserver.observe(card);
    });

    // === ACTIVE NAV LINK HIGHLIGHTING ===
    function highlightActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = navbar.offsetHeight;

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNav);

    // === PERFORMANCE OPTIMIZATION ===
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function () {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(function () {
            // Scroll-dependent functions here are already called
        });
    }, { passive: true });

    // === CONSOLE GREETING ===
    console.log('%c🌲 Yachay Forestal', 'color: #4a7c59; font-size: 24px; font-weight: bold;');
    console.log('%cConectamos tecnología y naturaleza para un Ecuador verde', 'color: #7cb342; font-size: 14px;');

    // === LOADING ANIMATION ===
    window.addEventListener('load', function () {
        document.body.classList.add('loaded');
    });
});

// === CSS ANIMATIONS FOR JAVASCRIPT ===
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    @keyframes float {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: var(--secondary-green);
        font-weight: 600;
    }
    
    body.loaded {
        animation: fadeIn 0.5s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);
