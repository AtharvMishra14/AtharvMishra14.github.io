/* ===========================
   MICROSOFT CLARITY TRACKING
=========================== */

// Custom Clarity tracking functions for portfolio events
// These functions are used to track user interactions with the portfolio

const trackResumeDownload = () => {
  if (window.clarity) {
    clarity("event", "resume_download");
  }
};

const trackGithubClick = () => {
  if (window.clarity) {
    clarity("event", "github_click");
  }
};

const trackLinkedinClick = () => {
  if (window.clarity) {
    clarity("event", "linkedin_click");
  }
};

const trackAetherVisit = () => {
  if (window.clarity) {
    clarity("event", "aether_visit");
  }
};

const trackProjectClick = (projectName) => {
  if (window.clarity) {
    clarity("event", `project_click_${projectName}`);
  }
};

// Initialize Clarity event tracking with automatic event listeners
const initializeClarityTracking = () => {
  // Resume button tracking (Hero section)
  const resumeBtn = document.getElementById('resume-btn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', trackResumeDownload);
  }

  // Aether Live button tracking (Hero section)
  const aetherLiveBtn = document.getElementById('aether-live-btn');
  if (aetherLiveBtn) {
    aetherLiveBtn.addEventListener('click', trackAetherVisit);
  }

  // GitHub profile links tracking (Multiple locations: Hero, Contact sections)
  const githubLinks = document.querySelectorAll('a[href*="github.com/AtharvMishra14"]:not([data-project-click])');
  githubLinks.forEach(link => {
    link.addEventListener('click', trackGithubClick);
  });

  // LinkedIn profile links tracking (Hero and Contact sections)
  const linkedinLinks = document.querySelectorAll('a[href*="linkedin.com/in/atharv-mishra"]');
  linkedinLinks.forEach(link => {
    link.addEventListener('click', trackLinkedinClick);
  });

  // Project GitHub links tracking (Featured and Projects sections)
  const projectLinks = document.querySelectorAll('[data-project-click]');
  projectLinks.forEach(link => {
    const projectName = link.getAttribute('data-project-click');
    link.addEventListener('click', () => trackProjectClick(projectName));
  });
};

/* ===========================
   TYPED.JS INITIALIZATION
=========================== */

// Removed since hero now has static heading

/* ===========================
   PARTICLES.JS INITIALIZATION
=========================== */

particlesJS("particles-js", {
  particles: {
    number: {
      value: 80
    },
    color: {
      value: "#7c3aed"
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.4
    },
    size: {
      value: 3
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#2563eb",
      opacity: 0.3
    },
    move: {
      enable: true,
      speed: 2
    }
  }
});

/* ===========================
   ANIMATED COUNTERS
=========================== */

const animateCounters = () => {
  const counters = document.querySelectorAll('.counter');
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        const target = parseInt(entry.target.dataset.target);
        const duration = 2000;
        const start = Date.now();

        const updateCounter = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const current = Math.floor(progress * target);
          
          entry.target.textContent = current;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            entry.target.textContent = target;
            entry.target.classList.add('animated');
          }
        };

        updateCounter();
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));
};

/* ===========================
   ANALYTICS TRACKING
=========================== */

const initializeAnalytics = () => {
  // Initialize storage keys
  const keys = ['resume-downloads', 'project-clicks', 'aether-visits', 'years-building'];
  
  keys.forEach(key => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, '0');
    }
  });

  // Update analytics display
  updateAnalyticsDisplay();

  // Resume downloads tracking
  const resumeBtn = document.getElementById('resume-btn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      incrementAnalytic('resume-downloads');
    });
  }

  // Aether visits tracking
  const aetherBtn = document.getElementById('aether-live-btn');
  if (aetherBtn) {
    aetherBtn.addEventListener('click', () => {
      incrementAnalytic('aether-visits');
    });
  }

  // Project clicks tracking
  const projectLinks = document.querySelectorAll('[data-project-click]');
  projectLinks.forEach(link => {
    link.addEventListener('click', () => {
      incrementAnalytic('project-clicks');
    });
  });

  // Calculate years building
  const startYear = 2024;
  const currentYear = new Date().getFullYear();
  const yearsDiff = currentYear - startYear;
  localStorage.setItem('years-building', yearsDiff.toString());
};

const incrementAnalytic = (key) => {
  const current = parseInt(localStorage.getItem(key)) || 0;
  localStorage.setItem(key, (current + 1).toString());
  updateAnalyticsDisplay();
};

const updateAnalyticsDisplay = () => {
  const counters = document.querySelectorAll('.analytics-counter');
  
  counters.forEach(counter => {
    const key = counter.dataset.storageKey;
    const value = localStorage.getItem(key) || '0';
    counter.textContent = value;
  });
};

/* ===========================
   SCROLL REVEAL ANIMATIONS
=========================== */

const initializeScrollReveal = () => {
  const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeUp 0.8s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  const revealElements = document.querySelectorAll('.section, .card, .stat, .timeline-item');
  revealElements.forEach(el => observer.observe(el));
};

/* ===========================
   SMOOTH SCROLL BEHAVIOR
=========================== */

const initializeSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
};

/* ===========================
   NAVBAR ACTIVE LINK TRACKING
=========================== */

const initializeNavbarTracking = () => {
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '-120px 0px -66% 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`nav a[href="#${entry.target.id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('section[id]').forEach(section => {
    observer.observe(section);
  });
};

/* ===========================
   INITIALIZATION
=========================== */

document.addEventListener('DOMContentLoaded', () => {
  animateCounters();
  initializeAnalytics();
  initializeScrollReveal();
  initializeSmoothScroll();
  initializeNavbarTracking();
  initializeClarityTracking();
});