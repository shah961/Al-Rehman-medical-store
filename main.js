/* ==========================================================================
   AL RAHMAN MEDICAL STORE — GLOBAL LOGIC & ANIMATION SCRIPT (main.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  /* ------------------------------------------------------------------------
     1. GSAP ScrollTrigger Entrance Animations
     ------------------------------------------------------------------------ */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.feature-card, .product-card', {
      duration: 0.8,
      y: 40,
      opacity: 0,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.features-grid, .products-grid',
        start: 'top 85%'
      }
    });

    gsap.from('.stat-item', {
      duration: 1,
      scale: 0.9,
      opacity: 0,
      stagger: 0.2,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.stats-bar',
        start: 'top 90%'
      }
    });
  }

  /* ------------------------------------------------------------------------
     2. Hero WhatsApp Prescription Upload Handler
     ------------------------------------------------------------------------ */
  const prescriptionForm = document.getElementById('hero-prescription-form');
  if (prescriptionForm) {
    prescriptionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('patient-name').value.trim();
      const fileInput = document.getElementById('prescription-file');
      
      let message = `Hello Al Rahman Medical Store,%0A%0A*New Prescription Order*%0A*Patient Name:* ${encodeURIComponent(name)}`;
      
      if (fileInput.files.length > 0) {
        message += `%0A*Attached File:* ${encodeURIComponent(fileInput.files[0].name)}`;
      }
      
      message += `%0A%0APlease process my prescription and provide medicine availability & pricing.`;
      
      window.open(`https://wa.me/923059027939?text=${message}`, '_blank');
    });
  }

  /* ------------------------------------------------------------------------
     3. Client-Side Product Filter & Live Search
     ------------------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        productCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
            if (typeof gsap !== 'undefined') {
              gsap.fromTo(card, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.3 });
            }
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ------------------------------------------------------------------------
     4. Mobile Navigation Toggle
     ------------------------------------------------------------------------ */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = 'var(--nav-height)';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'var(--secondary-dark)';
        navLinks.style.padding = '1.5rem';
      }
    });
  }
});
