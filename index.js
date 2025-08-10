/* ==========  GLOBAL HELPERS  ========== */
function toggle(el) { el.classList.toggle('hidden'); }
function qs(sel)    { return document.querySelector(sel); }
function qsa(sel)   { return document.querySelectorAll(sel); }

/* ========== EXTRACTED EMBEDDED JAVASCRIPT FROM HTML ========== */

/* Award Badge Animation */
document.addEventListener('DOMContentLoaded', () => {
  const badge = document.getElementById('awardBadgeInline');
  if (!badge) return;
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        badge.classList.add('animate-badge-enter');
        observer.unobserve(badge);
      }
    });
  }, { threshold: 0.3 });
  io.observe(badge);
});

/* Mobile Menu and Logo Visibility Control */
document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Logo visibility control
  const headerLogo = document.getElementById('headerLogo');
  const heroSection = document.getElementById('hero');
  
  if (headerLogo && heroSection) {
    function updateLogoVisibility() {
      const heroRect = heroSection.getBoundingClientRect();
      const scrollPosition = window.scrollY;
      const heroBottom = heroRect.bottom + scrollPosition;

      // Show logo when scrolled past 80% of hero section
      if (window.scrollY > heroBottom * 0.8) {
        headerLogo.classList.remove('opacity-0', 'pointer-events-none');
        headerLogo.classList.add('opacity-100');
      } else {
        headerLogo.classList.remove('opacity-100');
        headerLogo.classList.add('opacity-0', 'pointer-events-none');
      }
    }

    // Initialize
    updateLogoVisibility();

    // Event listeners
    window.addEventListener('scroll', updateLogoVisibility);
    window.addEventListener('resize', updateLogoVisibility);

    // Check again after everything loads
    window.addEventListener('load', updateLogoVisibility);
  }
});

/* Video Player Control */
document.addEventListener('DOMContentLoaded', function () {
  const video = document.getElementById('differenceVideo');
  const playButton = document.getElementById('videoPlayButton');
  const section = document.getElementById('difference-section');

  if (video && playButton && section) {
    // Initial setup
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    function tryPlayVideo() {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          playButton.style.display = 'none';
        }).catch((error) => {
          // Show button if autoplay fails
          playButton.style.display = 'flex';
          console.log("Autoplay blocked:", error);
        });
      }
    }

    // Intersection Observer to control video playback
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tryPlayVideo();
        } else {
          video.pause();
        }
      });
    }, {
      threshold: 0.5 // 50% of section must be visible
    });

    observer.observe(section);

    // Manual play button behavior
    playButton.addEventListener('click', function () {
      video.muted = false;
      video.play().then(() => {
        playButton.style.display = 'none';
      }).catch(error => {
        console.log('Manual play failed:', error);
      });
    });

    // Unmute on first user interaction anywhere on page
    document.addEventListener('click', function enableSound() {
      video.muted = false;
      document.removeEventListener('click', enableSound);
    }, { once: true });

    // Manage play/pause UI
    video.addEventListener('play', function () {
      playButton.style.display = 'none';
    });

    video.addEventListener('pause', function () {
      playButton.style.display = 'flex';
    });
  }
});

/* Pricing Calculator Functions */
function selectService(service, basePrice) {
  const areaSlider = document.getElementById('area-slider');
  if (!areaSlider) return;
  
  const area = parseInt(areaSlider.value);
  const priceMultiplier = area / 1500; // base is 1500 sq ft
  const price = Math.round(basePrice * priceMultiplier);

  // Update the price
  const priceElement = document.getElementById(`${service}-price`);
  if (priceElement) {
    priceElement.innerText = `$${price}`;
  }

  // Toggle dropdown info
  const infoEl = document.getElementById(`${service}-info`);
  if (infoEl) {
    infoEl.classList.toggle('hidden');
  }
}

/* Sticky Logo Control */
document.addEventListener('DOMContentLoaded', function() {
  const stickyLogo = document.getElementById('sticky-logo');
  
  if (stickyLogo) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > window.innerHeight * 0.7) {
        stickyLogo.classList.add('show');
      } else {
        stickyLogo.classList.remove('show');
      }
    });
  }
});

/* Scroll Animation Functions */
function animateOnScroll() {
  const elements = document.querySelectorAll('[data-aos]');

  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150; // px

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('aos-animate');
    } else {
      element.classList.remove('aos-animate');
    }
  });
}

function handleScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');
  const windowHeight = window.innerHeight;
  const windowTop = window.scrollY;
  const windowBottom = windowTop + windowHeight;

  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top + windowTop;
    const elementBottom = elementTop + element.offsetHeight;

    // Check if element is in viewport
    if (elementBottom >= windowTop && elementTop <= windowBottom) {
      const animationType = element.getAttribute('data-animate');
      const delay = element.getAttribute('data-delay') || '0';

      element.style.animationDelay = delay;
      element.classList.add(`animate-${animationType}`);
      element.style.opacity = '1'; // Make visible before animation starts

      // Remove attribute to prevent re-animation
      element.removeAttribute('data-animate');
    }
  });
}

/* Auto-scrolling Animation for Features */
document.addEventListener('DOMContentLoaded', function () {
  const scrollingFeatures = document.querySelector('.scrolling-features');
  if (scrollingFeatures) {
    // Clone the first feature set and append to create seamless loop
    const featureSet = document.querySelector('.feature-set');
    if (featureSet) {
      const clone = featureSet.cloneNode(true);
      scrollingFeatures.appendChild(clone);

      // Pause animation on hover
      scrollingFeatures.addEventListener('mouseenter', () => {
        scrollingFeatures.style.animationPlayState = 'paused';
      });
      scrollingFeatures.addEventListener('mouseleave', () => {
        scrollingFeatures.style.animationPlayState = 'running';
      });
    }
  }
});

/* Initialize scroll animations */
document.addEventListener('DOMContentLoaded', () => {
  // Run once on load
  animateOnScroll();
  handleScrollAnimations();

  // Then run on scroll
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('scroll', handleScrollAnimations);
});

/* ========== END OF EXTRACTED EMBEDDED JAVASCRIPT ========== */

/* See More Button Functionality */
document.addEventListener('DOMContentLoaded', function () {
  // Set up event listeners for all see more buttons
  const buttons = document.querySelectorAll('.see-more-btn');

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      const category = this.id.split('-')[0];
      const extraDiv = document.getElementById(`${category}-extra`);
      const icon = document.getElementById(`${category}-icon`);
      const textSpan = document.getElementById(`${category}-text`);

      if (extraDiv && icon && textSpan) {
        if (extraDiv.classList.contains('hidden')) {
          // Show extra content
          extraDiv.classList.remove('hidden');
          textSpan.textContent = textSpan.textContent.replace('See all', 'See less');
          icon.classList.add('rotate-180');
        } else {
          // Hide extra content
          extraDiv.classList.add('hidden');
          textSpan.textContent = textSpan.textContent.replace('See less', 'See all');
          icon.classList.remove('rotate-180');
        }
      }
    });
  });
});

/* ==========  PRICING CALCULATOR  ========== */

/* Pricing Table */
const pricingTable = {
  1500: { monthly: 125, biweekly: 125, weekly: 125, triweekly: 125, onetime: 200, moveout: 200 },
  2000: { monthly: 155, biweekly: 145, weekly: 135, triweekly: 150, onetime: 230, moveout: 230 },
  2500: { monthly: 165, biweekly: 155, weekly: 145, triweekly: 160, onetime: 240, moveout: 240 },
  3000: { monthly: 175, biweekly: 165, weekly: 155, triweekly: 170, onetime: 250, moveout: 250 },
  3500: { monthly: 185, biweekly: 175, weekly: 165, triweekly: 180, onetime: 260, moveout: 260 },
  4000: { monthly: 195, biweekly: 185, weekly: 175, triweekly: 190, onetime: 275, moveout: 275 },
  4500: { monthly: 205, biweekly: 195, weekly: 185, triweekly: 200, onetime: 280, moveout: 280 }
};

/* State */
let selectedType = 'standard';           // 'standard' or (commented-out) 'deep'
const selectedAddons = { onetime: new Set(), moveout: new Set() };

/* Helpers */
function updateServicePrice(service, base) {
  const priceEl = document.getElementById(`${service}-price`);
  if (!priceEl) return;
  
  let addOns = 0;
  selectedAddons[service].forEach(p => addOns += +p);
  priceEl.dataset.base = base;
  priceEl.textContent = `$${base + addOns}`;
}

function updatePrices(area) {
  const p = pricingTable[area];
  if (!p) return;
  
  const multiplier = selectedType === 'deep' ? 1.4 : 1;

  const monthlyEl = document.getElementById('monthly-price');
  const biweeklyEl = document.getElementById('biweekly-price');
  const weeklyEl = document.getElementById('weekly-price');
  const triweeklyEl = document.getElementById('triweekly-price');

  if (monthlyEl) monthlyEl.textContent = `$${Math.round(p.monthly * multiplier)}`;
  if (biweeklyEl) biweeklyEl.textContent = `$${Math.round(p.biweekly * multiplier)}`;
  if (weeklyEl) weeklyEl.textContent = `$${Math.round(p.weekly * multiplier)}`;
  if (triweeklyEl) triweeklyEl.textContent = `$${Math.round(p.triweekly * multiplier)}`;

  updateServicePrice('onetime', Math.round(p.onetime * multiplier));
  updateServicePrice('moveout', Math.round(p.moveout * multiplier));
}

function toggleDropdown(id, btn) {
  const panel = document.getElementById(id);
  const chev = btn.querySelector('i');
  if (panel && chev) {
    panel.classList.toggle('hidden');
    chev.classList.toggle('rotate-180');
  }
}

/* Initialize Pricing Calculator */
document.addEventListener('DOMContentLoaded', () => {
  /* --- Slider & initial display ---------- */
  const slider = document.getElementById('area-slider');
  const areaDisp = document.getElementById('area-display');
  
  if (slider && areaDisp) {
    updatePrices(slider.value);
    slider.addEventListener('input', e => {
      const val = +e.target.value;
      areaDisp.textContent = `${val} sq ft`;
      updatePrices(val);
    });
  }

  /* --- Add-on checkboxes ----------------- */
  document.querySelectorAll('.addon-checkbox').forEach(cb => {
    cb.addEventListener('change', function () {
      const group = cb.closest('[id$="-dropdown"]').id.replace('-dropdown', '');
      if (cb.checked) selectedAddons[group].add(cb.dataset.price);
      else selectedAddons[group].delete(cb.dataset.price);
      updateServicePrice(group, +document.getElementById(`${group}-price`).dataset.base);
    });
  });

  /* --- Book-now summary ------------------ */
  const bookNowBtn = document.getElementById('book-now-btn');
  if (bookNowBtn) {
    bookNowBtn.addEventListener('click', () => {
      if (!slider) return;
      
      const area = +slider.value;
      let msg = `Booking Summary for ${area} sq ft\n\n`;
      ['onetime','moveout'].forEach(svc => {
        const priceEl = document.getElementById(`${svc}-price`);
        if (priceEl) {
          const price = +priceEl.textContent.replace('$','');
          msg += `${svc === 'onetime' ? 'One-time' : 'Move-In/Out'}  $${price}\n`;
        }
      });
      msg += '\nRecurring:\n';
      
      const monthlyEl = document.getElementById('monthly-price');
      const biweeklyEl = document.getElementById('biweekly-price');
      const weeklyEl = document.getElementById('weekly-price');
      const triweeklyEl = document.getElementById('triweekly-price');
      
      if (monthlyEl) msg += `• Monthly      ${monthlyEl.textContent}\n`;
      if (biweeklyEl) msg += `• Bi-weekly    ${biweeklyEl.textContent}\n`;
      if (weeklyEl) msg += `• Weekly       ${weeklyEl.textContent}\n`;
      if (triweeklyEl) msg += `• Every 3 Wks  ${triweeklyEl.textContent}\n`;
      // alert(msg);
    });
  }
});

/* ==========  ZIP CHECKER  ========== */
const servicedZips = ['77433','77429','77095','77377','77070','77065'];
document.addEventListener('DOMContentLoaded',()=>{
  const res = qs('#zip-result');
  qs('#zip-check-btn')?.addEventListener('click',()=>{
    const val = qs('#zip-input').value.trim();
    if(!val) return;
    if (servicedZips.includes(val)) {
      res.textContent = 'Good news! We service your area!';
      res.className = 'text-center mt-2 text-green-600 text-sm font-bold';
    } else {
      res.textContent = 'Sorry, the location is outside of our service area.';
      res.className = 'text-center mt-2 text-red-600 text-sm font-bold';
    }
  });
});
