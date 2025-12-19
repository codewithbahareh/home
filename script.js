/* =========================================================
   Global UI Script – Code With Bahareh
   Clean • Accessible • SEO-safe • Multi-page compatible
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* =======================
     Mobile Menu Toggle
  ======================= */
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.header__ul');
  const nav = document.querySelector('.header__nav');

  if (menuToggle && menu && nav) {
    const icon = menuToggle.querySelector('i');



  const openMenu = () => {
  menu.classList.add('active');
  menu.setAttribute('aria-hidden', 'false');   // ✅ ADD HERE
  menuToggle.setAttribute('aria-expanded', 'true');
  icon?.classList.replace('fa-bars', 'fa-times');
  document.body.style.overflow = 'hidden';
};

const closeMenu = () => {
  menu.classList.remove('active');
  menu.setAttribute('aria-hidden', 'true');    // ✅ ADD HERE
  menuToggle.setAttribute('aria-expanded', 'false');
  icon?.classList.replace('fa-times', 'fa-bars');
  document.body.style.overflow = '';
};


    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.contains('active') ? closeMenu() : openMenu();
    });

    // Close when clicking a menu link
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && menu.classList.contains('active')) {
        closeMenu();
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('active')) {
        closeMenu();
      }
    });

    // Close menu on desktop resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });
  }

  /* =======================
     Back To Top Button
  ======================= */
  const backToTop = document.getElementById('backToTop');
  const footer = document.querySelector('.footer');

  if (backToTop) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const distanceFromBottom =
        document.documentElement.scrollHeight -
        (scrollY + window.innerHeight);

      if (scrollY > 300 && (!footer || distanceFromBottom > 200)) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* =======================
     Smooth Anchor Scroll
  ======================= */
  const HEADER_OFFSET = 100;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;

      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      const y =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        HEADER_OFFSET;

      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

});
