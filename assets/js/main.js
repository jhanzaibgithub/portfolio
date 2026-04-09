/* ===================================================
   JAHANZAIB ZAFAR - Modern Portfolio JS
   =================================================== */

(function () {
  'use strict';

  // ─── Preloader ───
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('loaded');
        setTimeout(() => preloader.remove(), 500);
      }, 1200);
    }
  });

  // ─── Toast Notification System ───
  function showToast(type, message) {
    const existing = document.querySelectorAll('.toast-notification');
    existing.forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;

    const icons = {
      success: 'bi-check-circle-fill',
      error: 'bi-exclamation-circle-fill',
      sending: 'bi-send-fill'
    };

    toast.innerHTML = `
      <i class="bi ${icons[type] || 'bi-info-circle-fill'}"></i>
      <span>${message}</span>
      <button class="toast-close" aria-label="Close"><i class="bi bi-x"></i></button>
    `;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('toast-visible');
    });

    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.classList.remove('toast-visible');
      setTimeout(() => toast.remove(), 300);
    });

    if (type !== 'sending') {
      setTimeout(() => {
        toast.classList.remove('toast-visible');
        setTimeout(() => toast.remove(), 300);
      }, 5000);
    }

    return toast;
  }

  // ─── Theme Toggle (Light/Dark) ───
  function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    const body = document.body;
    const saved = localStorage.getItem('theme');

    if (saved) {
      body.setAttribute('data-theme', saved);
    }

    if (toggle) {
      toggle.addEventListener('click', () => {
        const current = body.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);

        if (window._particleAnim) {
          cancelAnimationFrame(window._particleAnim);
        }
        initParticles();
      });
    }

    const mobileToggle = document.querySelector('.mobile-theme-toggle');
    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => {
        const current = body.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
      });
    }
  }

  // ─── Particle Background ───
  function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const isDark = document.body.getAttribute('data-theme') !== 'light';
    const particleColor = isDark ? '108, 99, 255' : '108, 99, 255';
    const particleOpacityBase = isDark ? 0.1 : 0.06;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticles() {
      particles = [];
      const count = Math.min(Math.floor(window.innerWidth / 15), 80);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.3 + particleOpacityBase
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${particleColor}, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      window._particleAnim = requestAnimationFrame(drawParticles);
    }

    resize();
    createParticles();
    drawParticles();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        createParticles();
      }, 250);
    });
  }

  // ─── Cursor Glow ───
  function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow || window.innerWidth < 768) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function updateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      requestAnimationFrame(updateGlow);
    }

    updateGlow();
  }

  // ─── Navbar ───
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    const navLinks = document.querySelectorAll('.nav-link');

    function handleScroll() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (navToggle) {
      navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
      });
    }

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
      const scrollY = window.scrollY + 200;

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === id) {
              link.classList.add('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
  }

  // ─── Typed Effect ───
  function initTypedEffect() {
    const output = document.getElementById('typed-output');
    if (!output) return;

    const strings = [
      'scalable web applications.',
      'RESTful APIs & microservices.',
      'Laravel & Node.js backends.',
      'Vue.js interactive interfaces.',
      'secure payment integrations.',
      'cloud-deployed solutions.'
    ];

    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 60;

    function type() {
      const currentString = strings[stringIndex];

      if (isDeleting) {
        output.textContent = currentString.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 30;
      } else {
        output.textContent = currentString.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 60;
      }

      if (!isDeleting && charIndex === currentString.length) {
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        stringIndex = (stringIndex + 1) % strings.length;
        typingSpeed = 300;
      }

      setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);
  }

  // ─── Counter Animation ───
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          if (el.classList.contains('counted')) return;
          el.classList.add('counted');

          const target = parseInt(el.getAttribute('data-count'));
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let step = 0;

          const timer = setInterval(() => {
            step++;
            const current = Math.min(Math.round(increment * step), target);
            el.textContent = current;
            if (step >= steps) {
              el.textContent = target;
              clearInterval(timer);
            }
          }, duration / steps);

          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  // ─── Skill Bar Animation ───
  function initSkillBars() {
    const bars = document.querySelectorAll('.skill-bar-fill');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.getAttribute('data-width');
          setTimeout(() => {
            bar.style.width = width + '%';
          }, 200);
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });

    bars.forEach(b => observer.observe(b));
  }

  // ─── Scroll Top ───
  function initScrollTop() {
    const btn = document.getElementById('scrollTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }, { passive: true });

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─── AOS Init ───
  function initAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
        disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      });
    }
  }

  // ─── Project Modal System ───
  function initProjectModals() {
    const modalOverlay = document.getElementById('projectModalOverlay');
    const modalContent = document.getElementById('projectModalContent');
    if (!modalOverlay || !modalContent) return;

    function openModal(card) {
      const title = card.dataset.projectTitle || '';
      const desc = card.dataset.projectDesc || '';
      const techs = card.dataset.projectTech || '';
      const liveUrl = card.dataset.projectUrl || '';
      const githubUrl = card.dataset.projectGithub || '';
      const imgSrc = card.querySelector('.project-thumb-img')
        ? card.querySelector('.project-thumb-img').src
        : '';

      const techBadges = techs.split(',').map(t => t.trim()).filter(Boolean)
        .map(t => `<span>${t}</span>`).join('');

      const liveBtn = liveUrl
        ? `<a href="${liveUrl}" target="_blank" rel="noopener" class="btn-primary-glow"><span>Live Demo</span><i class="bi bi-box-arrow-up-right"></i></a>`
        : '';
      const githubBtn = githubUrl
        ? `<a href="${githubUrl}" target="_blank" rel="noopener" class="btn-outline-glow"><span>GitHub</span><i class="bi bi-github"></i></a>`
        : '';

      modalContent.innerHTML = `
        <button class="project-modal-close" aria-label="Close modal"><i class="bi bi-x-lg"></i></button>
        <div class="project-modal-grid">
          <div class="project-modal-image">
            ${imgSrc ? `<img src="${imgSrc}" alt="${title}">` : `<div class="project-modal-placeholder"><i class="bi bi-image"></i></div>`}
          </div>
          <div class="project-modal-details">
            <h2>${title}</h2>
            <p>${desc}</p>
            ${techBadges ? `<h6>Technologies</h6><div class="modal-tech-tags">${techBadges}</div>` : ''}
            <div class="project-modal-actions">
              ${liveBtn}${githubBtn}
            </div>
          </div>
        </div>
      `;

      document.body.style.overflow = 'hidden';
      modalOverlay.classList.add('active');

      requestAnimationFrame(() => {
        modalOverlay.classList.add('visible');
      });

      modalContent.querySelector('.project-modal-close').addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
      });

      // Prevent clicks inside modal content from closing the modal
      modalContent.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    function closeModal() {
      modalOverlay.classList.remove('visible');
      setTimeout(() => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        document.body.classList.remove('modal-open');
        modalContent.innerHTML = '';
      }, 300);
    }

    // Click on overlay backdrop closes modal
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    // ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });

    // Card click handlers - use event delegation on the projects grid
    function bindCardClicks() {
      const projectCards = document.querySelectorAll('.project-card[data-project-url]');
      projectCards.forEach(card => {
        if (card.dataset.modalBound) return;
        card.dataset.modalBound = 'true';
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
          // Don't open modal if clicking a direct external link
          if (e.target.closest('a[target="_blank"]')) return;
          e.preventDefault();
          openModal(card);
        });
      });
    }

    bindCardClicks();
    // Expose for Load More to re-bind new cards
    window._bindProjectCardClicks = bindCardClicks;
  }

  // ─── Project Thumbnail Fetching (Microlink Screenshot API) ───
  function initProjectThumbnails() {
    const cards = document.querySelectorAll('.project-card[data-project-url]');

    cards.forEach(card => {
      const url = card.dataset.projectUrl;
      const imgContainer = card.querySelector('.project-image');
      if (!url || !imgContainer) return;

      // Check if there's already a local image that loaded successfully
      const existingImg = imgContainer.querySelector('img');
      if (existingImg && existingImg.complete && existingImg.naturalWidth > 0) return;

      // Show skeleton loader
      const skeleton = document.createElement('div');
      skeleton.className = 'skeleton-loader';
      imgContainer.prepend(skeleton);

      // Use microlink screenshot API
      const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;

      fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
          skeleton.remove();
          const screenshotUrl = data?.data?.screenshot?.url || '';
          if (screenshotUrl) {
            const img = imgContainer.querySelector('img') || document.createElement('img');
            img.src = screenshotUrl;
            img.alt = card.dataset.projectTitle || 'Project thumbnail';
            img.className = 'project-thumb-img';
            img.loading = 'lazy';
            if (!imgContainer.querySelector('img')) {
              imgContainer.prepend(img);
            }
          } else {
            showFallback(imgContainer, card.dataset.projectTitle);
          }
        })
        .catch(() => {
          skeleton.remove();
          showFallback(imgContainer, card.dataset.projectTitle);
        });
    });

    function showFallback(container, title) {
      // Only show fallback if no image exists
      if (container.querySelector('img')) return;
      const fallback = document.createElement('div');
      fallback.className = 'project-thumb-fallback';
      const initials = (title || 'P')
        .split(/[\s-]+/)
        .map(w => w[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
      fallback.innerHTML = `<span class="fallback-initials">${initials}</span>`;
      container.prepend(fallback);
    }
  }

  // ─── Contact Form (Mailto Approach) ───
  function initContactForm() {
    const form = document.getElementById('contactForm');
    const statusEl = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const name = formData.get('from_name').trim();
      const email = formData.get('reply_to').trim();
      const subject = formData.get('subject').trim();
      const message = formData.get('message').trim();

      // Validation
      if (!name || !email || !subject || !message) {
        showToast('error', 'Please fill in all fields.');
        showStatus('error', 'Please fill in all fields.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('error', 'Please enter a valid email address.');
        showStatus('error', 'Please enter a valid email address.');
        return;
      }

      // Build mailto link
      const mailtoSubject = `Portfolio Contact: ${subject}`;
      const mailtoBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
      const mailtoLink = `mailto:jahanzaibryk2020@gmail.com?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;

      // Open mail app
      window.location.href = mailtoLink;

      showToast('success', 'Opening your email client...');
      showStatus('success', 'Your mail app should open with the message ready to send.');

      // Reset form after brief delay
      setTimeout(() => {
        form.reset();
      }, 1000);
    });

    function showStatus(type, msg) {
      statusEl.className = 'form-status ' + type;
      statusEl.textContent = msg;

      if (type === 'success') {
        setTimeout(() => {
          statusEl.className = 'form-status';
          statusEl.textContent = '';
        }, 5000);
      }
    }
  }

  // ─── Load More Projects ───
  function initLoadMore() {
    const PROJECTS_PER_PAGE = 6;
    const grid = document.querySelector('.projects-grid');
    const wrapper = document.getElementById('loadMoreWrapper');
    const btn = document.getElementById('loadMoreBtn');
    const counter = document.getElementById('projectsCounter');

    if (!grid || !wrapper || !btn) return;

    const allCards = Array.from(grid.querySelectorAll('.project-card'));
    const totalProjects = allCards.length;
    let visibleCount = 0;

    function updateUI() {
      counter.textContent = `Showing ${visibleCount} of ${totalProjects} projects`;

      if (visibleCount >= totalProjects) {
        wrapper.classList.add('hidden');
      } else {
        wrapper.classList.remove('hidden');
      }
    }

    // Initially show first batch, hide the rest
    allCards.forEach((card, i) => {
      if (i < PROJECTS_PER_PAGE) {
        visibleCount++;
      } else {
        card.classList.add('card-hidden');
      }
    });

    updateUI();

    btn.addEventListener('click', () => {
      const hiddenCards = allCards.filter(c => c.classList.contains('card-hidden'));
      const nextBatch = hiddenCards.slice(0, PROJECTS_PER_PAGE);

      nextBatch.forEach((card, i) => {
        card.classList.remove('card-hidden');
        card.style.animationDelay = (i * 0.1) + 's';
        card.classList.add('card-revealing');
        visibleCount++;

        // Remove the animation class after it completes
        card.addEventListener('animationend', () => {
          card.classList.remove('card-revealing');
          card.style.animationDelay = '';
        }, { once: true });
      });

      // Re-bind modal clicks for newly visible cards
      if (window._bindProjectCardClicks) {
        window._bindProjectCardClicks();
      }

      // Refresh AOS for new elements
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }

      updateUI();
    });
  }

  // ─── Smooth Scroll for Anchor Links ───
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // ─── Mobile Nav Link Stagger Animation ───
  function initMobileNavAnimation() {
    const links = document.querySelectorAll('.mobile-nav-link');
    links.forEach((link, i) => {
      link.style.transitionDelay = (i * 0.05) + 's';
    });
  }

  // ─── Scroll-Triggered Animations ───
  function initScrollAnimations() {
    const animElements = document.querySelectorAll('.animate-on-scroll');

    if (!animElements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    animElements.forEach(el => observer.observe(el));
  }

  // ─── Staggered Project Card Animations ───
  function initStaggeredCards() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, i) => {
      card.style.transitionDelay = (i * 0.1) + 's';
    });
  }

  // ─── Initialize Everything ───
  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initParticles();
    initCursorGlow();
    initNavbar();
    initTypedEffect();
    initCounters();
    initSkillBars();
    initScrollTop();
    initAOS();
    initSmoothScroll();
    initMobileNavAnimation();
    initContactForm();
    initProjectModals();
    initProjectThumbnails();
    initLoadMore();
    initScrollAnimations();
    initStaggeredCards();
  });

  window.addEventListener('load', () => {
    if (typeof AOS !== 'undefined') AOS.refresh();
  });

})();
