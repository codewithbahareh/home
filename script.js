// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const headerUl = document.querySelector('.header__ul');

if (menuToggle && headerUl) {
    menuToggle.addEventListener('click', () => {
        headerUl.classList.toggle('active');
        const isExpanded = headerUl.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
        
        // Change icon
        const icon = menuToggle.querySelector('i');
        if (isExpanded) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
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
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!headerUl.contains(e.target) && !menuToggle.contains(e.target)) {
            headerUl.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
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

// Form submission (basic)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !message) {
            alert('لطفاً تمام فیلدها را پر کنید.');
            return;
        }
        
        // Here you would normally send the data to a server
        // For now, just show a success message
        alert(`پیام شما با موفقیت ارسال شد!\n\nنام: ${name}\nایمیل: ${email}\nپیام: ${message}`);
        
        // Reset form
        contactForm.reset();
    });
}

// Add hover effects to sample project cards
document.addEventListener('DOMContentLoaded', () => {
    const sampleCards = document.querySelectorAll('.sample__ul li');
    
    sampleCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.sample__icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.sample__icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
});