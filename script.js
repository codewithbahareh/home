// ============================================================
// SCRIPT.JS - COMPLETE FILE
// ============================================================

// ============================================================
// SECTION 1: MOBILE MENU TOGGLE
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    // --- DOM REFERENCES ---
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.header__list');
    const header = document.querySelector('.header');

    // --- Only proceed if elements exist ---
    if (menuToggle && menu) {
        const icon = menuToggle.querySelector('i');

        // --- OPEN MENU ---
        const openMenu = () => {
            menu.classList.add('active');
            menuToggle.setAttribute('aria-expanded', 'true');
            if (icon) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        };

        // --- CLOSE MENU ---
        const closeMenu = () => {
            menu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        };

        // --- TOGGLE MENU ON BUTTON CLICK ---
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (menu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // --- CLOSE MENU ON LINK CLICK ---
        const menuLinks = menu.querySelectorAll('.header__link');
        menuLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // --- CLOSE MENU ON CLICK OUTSIDE ---
        document.addEventListener('click', (e) => {
            if (!header.contains(e.target) && menu.classList.contains('active')) {
                closeMenu();
            }
        });

        // --- CLOSE MENU ON ESC KEY ---
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menu.classList.contains('active')) {
                closeMenu();
            }
        });

        // --- CLOSE MENU ON WINDOW RESIZE (desktop) ---
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && menu.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    // ============================================================
    // SECTION 2: BACK TO TOP BUTTON
    // ============================================================

    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        // --- SHOW/HIDE BUTTON BASED ON SCROLL POSITION ---
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.style.display = 'flex';
            } else {
                backToTop.style.display = 'none';
            }
        });

        // --- SMOOTH SCROLL TO TOP ON CLICK ---
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// ============================================================
// SECTION 3: SKILLS PROGRESS BARS - ANIMATE ON SCROLL
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skills__item');

    // --- USE INTERSECTION OBSERVER FOR PERFORMANCE ---
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fill = entry.target.querySelector('.skills__level-fill');
                    if (fill) {
                        // Get skill level from data attribute
                        const level = fill.dataset.level || 'good';
                        const widths = {
                            excellent: '90%',
                            good: '75%',
                            intermediate: '60%',
                            beginner: '40%'
                        };
                        // Stagger animation for each item
                        const index = Array.from(skillItems).indexOf(entry.target);
                        setTimeout(() => {
                            fill.style.width = widths[level] || '75%';
                        }, index * 100);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });

        skillItems.forEach(item => observer.observe(item));
    } else {
        // --- FALLBACK: animate immediately ---
        skillItems.forEach((item, index) => {
            const fill = item.querySelector('.skills__level-fill');
            if (fill) {
                setTimeout(() => {
                    const level = fill.dataset.level || 'good';
                    const widths = {
                        excellent: '90%',
                        good: '75%',
                        intermediate: '60%',
                        beginner: '40%'
                    };
                    fill.style.width = widths[level] || '75%';
                }, index * 100 + 200);
            }
        });
    }
});

// ============================================================
// SECTION 4: SKILL CLICK HANDLER WITH VIEW TRANSITIONS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // --- CHECK FOR VIEW TRANSITIONS API SUPPORT ---
    const supportsViewTransitions = 'startViewTransition' in document;

    document.querySelectorAll('.skills__item').forEach(item => {
        item.addEventListener('click', async function(e) {
            // --- DON'T INTERFERE WITH LINK CLICKS ---
            if (e.target.closest('a')) return;

            const skillName = this.querySelector('.skills__name')?.textContent || 'skill';

            // --- USE VIEW TRANSITIONS IF SUPPORTED ---
            if (supportsViewTransitions) {
                try {
                    await document.startViewTransition(() => {
                        this.classList.toggle('active');
                        // Toggle progress bar
                        const fill = this.querySelector('.skills__level-fill');
                        if (fill) {
                            const currentWidth = parseFloat(fill.style.width) || 0;
                            const newWidth = currentWidth > 50 ? 10 : 75;
                            fill.style.width = newWidth + '%';
                        }
                    }).ready;
                    console.log(`🔄 View transition completed for: ${skillName}`);
                } catch (error) {
                    // --- FALLBACK: direct toggle ---
                    this.classList.toggle('active');
                }
            } else {
                // --- FALLBACK: direct toggle ---
                this.classList.toggle('active');
                const fill = this.querySelector('.skills__level-fill');
                if (fill) {
                    const currentWidth = parseFloat(fill.style.width) || 0;
                    const newWidth = currentWidth > 50 ? 10 : 75;
                    fill.style.width = newWidth + '%';
                }
            }
        });
    });
});

// ============================================================
// SECTION 5: SET COPYRIGHT YEAR
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
