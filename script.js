// Mobile menu toggle with better touch support
const menuToggle = document.querySelector('.menu-toggle');
const headerUl = document.querySelector('.header__ul');
const headerNav = document.querySelector('.header__nav');

// Check if elements exist
if (menuToggle && headerUl && headerNav) {
    // Toggle menu function
    const toggleMenu = () => {
        const isExpanded = headerUl.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
        
        // Change icon
        const icon = menuToggle.querySelector('i');
        if (isExpanded) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            document.body.style.overflow = 'hidden'; // Prevent body scrolling
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = ''; // Re-enable body scrolling
        }
    };
    
    // Toggle menu on button click
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });
    
    // Close menu when clicking on a link
    const navLinks = headerUl.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            headerUl.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = ''; // Re-enable body scrolling
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!headerNav.contains(e.target) && headerUl.classList.contains('active')) {
            headerUl.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = ''; // Re-enable body scrolling
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && headerUl.classList.contains('active')) {
            headerUl.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = ''; // Re-enable body scrolling
        }
    });
}

// Back to top button
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Form submission with better validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation
        let errors = [];
        
        if (!name) errors.push('نام کامل الزامی است');
        if (!email) errors.push('ایمیل الزامی است');
        if (!message) errors.push('پیام الزامی است');
        
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push('فرمت ایمیل نامعتبر است');
        }
        
        if (errors.length > 0) {
            alert('لطفاً خطاهای زیر را اصلاح کنید:\n\n' + errors.join('\n'));
            return;
        }
        
        // Show success message
        alert('پیام شما با موفقیت ارسال شد! به زودی با شما تماس خواهیم گرفت.');
        
        // Reset form
        contactForm.reset();
        
        // Scroll to top of form
        contactForm.scrollIntoView({ behavior: 'smooth' });
    });
}

// Add loading lazy for images
document.addEventListener('DOMContentLoaded', () => {
    // Lazy load images if not already loaded
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only smooth scroll for internal page links
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for fixed header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on large screens
        if (window.innerWidth > 768) {
            const headerUl = document.querySelector('.header__ul');
            const menuToggle = document.querySelector('.menu-toggle');
            
            if (headerUl && menuToggle) {
                headerUl.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        }
    }, 250);
});
