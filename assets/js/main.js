/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();


// Portfolio isotope and filter
window.addEventListener('load', () => {
  let portfolioContainer = select('.portfolio-container');
  if (portfolioContainer) {
    let portfolioIsotope = new Isotope(portfolioContainer, {
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    let portfolioFilters = select('#portfolio-filters li', true);

    on('click', '#portfolio-filters li', function(e) {
      e.preventDefault();
      portfolioFilters.forEach(function(el) {
        el.classList.remove('filter-active');
      });
      this.classList.add('filter-active');

      portfolioIsotope.arrange({
        filter: this.getAttribute('data-filter')
      });
    }, true);
  }
});

// Initiate portfolio lightbox 
const portfolioLightbox = GLightbox({
  selector: '.portfolio-lightbox'
});

// Modern Portfolio Enhancements
(function() {
  'use strict';

  // Animated Counter for Stats
  function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      // Start animation when element is in viewport
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateCounter();
            observer.unobserve(entry.target);
          }
        });
      });
      
      observer.observe(counter);
    });
  }

  // Enhanced Service Item Interactions
  function initServiceInteractions() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
      // Add ripple effect on click
      item.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
      
      // Add tilt effect on mouse move
      item.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      });
      
      item.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      });
    });
  }

  // Enhanced Timeline Animations
  function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
      // Staggered animation
      item.style.animationDelay = `${index * 0.2}s`;
      
      // Add hover effects
      item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px)';
        this.style.transition = 'transform 0.3s ease';
      });
      
      item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
      });
    });
  }

  // Parallax Effect for Hero Section
  function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    });
  }

  // Enhanced Scroll Animations
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Special handling for stats
          if (entry.target.classList.contains('stat-item') || entry.target.classList.contains('stat-card')) {
            const counter = entry.target.querySelector('[data-count]');
            if (counter && !counter.classList.contains('animated')) {
              counter.classList.add('animated');
              animateSingleCounter(counter);
            }
          }
        }
      });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.stat-item, .stat-card, .timeline-item, .service-item').forEach(el => {
      observer.observe(el);
    });
  }

  // Animate single counter
  function animateSingleCounter(counter) {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 1500;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  }

  // Add CSS for ripple effect
  function addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
      }
      
      @keyframes ripple-animation {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
      
      .animate-in {
        animation: slideInUp 0.6s ease forwards;
      }
      
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Enhanced Portfolio Filtering with Smooth Transitions
  function initEnhancedPortfolioFiltering() {
    const filters = document.querySelectorAll('#portfolio-filters [data-filter]');
    const items = document.querySelectorAll('#portfolio-grid .portfolio-item');
    
    filters.forEach(filter => {
      filter.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all filters
        filters.forEach(f => f.classList.remove('active'));
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        // Animate items out
        items.forEach((item, index) => {
          const shouldShow = filterValue === '*' || item.classList.contains(filterValue);
          
          if (!shouldShow) {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            item.style.pointerEvents = 'none';
          } else {
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
              item.style.pointerEvents = 'auto';
            }, index * 100);
          }
        });
      });
    });
  }

  // Performance optimizations
  function initPerformanceOptimizations() {
    // Throttle scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(() => {
        if (originalScrollHandler) {
          originalScrollHandler();
        }
      }, 16); // ~60fps
    };

    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      resizeTimeout = setTimeout(() => {
        // Refresh AOS on resize
        if (window.AOS) {
          AOS.refresh();
        }
      }, 250);
    });

    // Lazy load images
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('loading-skeleton');
              observer.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        img.classList.add('loading-skeleton');
        imageObserver.observe(img);
      });
    }
  }

  // Reduced motion support
  function initReducedMotionSupport() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      // Disable animations for users who prefer reduced motion
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
      document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    }

    // Listen for changes in motion preference
    prefersReducedMotion.addEventListener('change', (e) => {
      if (e.matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        document.documentElement.style.setProperty('--transition-duration', '0.01ms');
      } else {
        document.documentElement.style.removeProperty('--animation-duration');
        document.documentElement.style.removeProperty('--transition-duration');
      }
    });
  }

  // Initialize everything when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    addRippleStyles();
    initPerformanceOptimizations();
    initReducedMotionSupport();
    animateCounters();
    initServiceInteractions();
    initTimelineAnimations();
    initParallaxEffect();
    initScrollAnimations();
    initEnhancedPortfolioFiltering();
  });

  // Re-initialize on window load for any dynamic content
  window.addEventListener('load', function() {
    // Refresh AOS for any new elements
    if (window.AOS) {
      AOS.refresh();
    }
  });

})();

// Skills Animation
function animateSkills() {
  const skillItems = document.querySelectorAll('.skill-item');
  
  skillItems.forEach(item => {
    const progressBar = item.querySelector('.skill-progress');
    const width = progressBar.getAttribute('data-width');
    
    // Animate progress bar
    setTimeout(() => {
      progressBar.style.width = width + '%';
    }, 500);
  });
}

// Initialize skills animation when section is visible
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkills();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  observer.observe(skillsSection);
}

// Enhanced AOS initialization
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS with enhanced settings
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out-cubic',
      once: true,
      offset: 100,
      delay: 0,
      anchorPlacement: 'top-bottom'
    });
  }
  
  // Initialize skill animations
  animateSkills();
  
  // Add hover effects to service items
  const serviceItems = document.querySelectorAll('.service-item');
  serviceItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Add floating animation to about elements
  const floatingElements = document.querySelectorAll('.floating-element');
  floatingElements.forEach((element, index) => {
    element.style.animationDelay = (index * 0.5) + 's';
  });
});