/* ==========  GLOBAL HELPERS  ========== */
function toggle(el) { el.classList.toggle('hidden'); }
function qs(sel)    { return document.querySelector(sel); }
function qsa(sel)   { return document.querySelectorAll(sel); }

/* ==========  HEADER  ========== */
document.addEventListener('DOMContentLoaded', () => {
  /* mobile menu */
  const mobileMenu  = qs('#mobileMenu');
  qs('#menuToggle').addEventListener('click', () => toggle(mobileMenu));

  /* sticky logo */
  const logo  = qs('#headerLogo');
  const hero  = qs('#hero');
  const logoCheck = () => {
    const heroBottom = hero.getBoundingClientRect().bottom;
    if (heroBottom < window.innerHeight * 0.2) logo.classList.remove('opacity-0','pointer-events-none');
    else                                        logo.classList.add   ('opacity-0','pointer-events-none');
  };
  logoCheck();
  window.addEventListener('scroll',logoCheck);
});

/* ==========  PRICING CALCULATOR  ========== */
const table = {
  1500:{m:125,bw:125,w:125,t:125,o:200,mo:200},
  2000:{m:155,bw:145,w:135,t:150,o:230,mo:230},
  2500:{m:165,bw:155,w:145,t:160,o:240,mo:240},
  3000:{m:175,bw:165,w:155,t:170,o:250,mo:250},
  3500:{m:185,bw:175,w:165,t:180,o:260,mo:260},
  4000:{m:195,bw:185,w:175,t:190,o:275,mo:275},
  4500:{m:205,bw:195,w:185,t:200,o:280,mo:280}
};

let addons      = { onetime:new Set(), moveout:new Set() };
const prices    = { m:'#monthly-price', bw:'#biweekly-price', w:'#weekly-price', t:'#triweekly-price',
                    o:'#onetime-price', mo:'#moveout-price' };

function updatePrices(area) {
  const p = table[area];
  for (const [k,sel] of Object.entries(prices)) {
    const base = p[k];
    if (!base) continue;
    const extra = (k==='o' || k==='mo') ? [...addons[k==='o'?'onetime':'moveout']].reduce((a,b)=>a+ +b,0) : 0;
    qs(sel).textContent = `$${base+extra}`;
    qs(sel).dataset.base = base;
  }
}

document.addEventListener('DOMContentLoaded',() => {
  const slider = qs('#area-slider');
  const disp   = qs('#area-display');
  disp.textContent = `${slider.value} sq ft`;
  updatePrices(slider.value);

  slider.addEventListener('input',e=>{
    disp.textContent = `${e.target.value} sq ft`;
    updatePrices(+e.target.value);
  });

  /* dropdown toggles */
  qsa('[data-dropdown]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const id = btn.dataset.dropdown;
      toggle(qs(id));
      btn.querySelector('i').classList.toggle('rotate-180');
    });
  });

  /* addon checkboxes */
  qsa('.addon-checkbox').forEach(cb=>{
    cb.addEventListener('change',()=>{
      const group = cb.closest('[id$="-dropdown"]').id.startsWith('onetime')?'onetime':'moveout';
      cb.checked ? addons[group].add(cb.dataset.price) : addons[group].delete(cb.dataset.price);
      updatePrices(slider.value);
    });
  });
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

/* ==========  HERO & DIFFERENCE videos autoplay w/ fallback buttons  ========== */
function setupAutoplayVideo(sectionId, videoId, btnId, threshold = .5) {
  const section = qs(sectionId);
  if (!section) return;
  const video   = qs(videoId);
  const btn     = qs(btnId);

  const tryPlay = () => video.play().then(()=>btn.style.display='none')
                                    .catch(()=>btn.style.display='flex');

  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=> e.isIntersecting ? tryPlay() : video.pause());
  },{threshold});
  io.observe(section);

  btn.addEventListener('click',()=>{
    video.muted=false; tryPlay();
  });

  document.addEventListener('click',function unmute(){video.muted=false;document.removeEventListener('click',unmute);},{once:true});
}
document.addEventListener('DOMContentLoaded',()=>{
  setupAutoplayVideo('#difference-section' , '#differenceVideo', '#videoPlayButton');
  setupAutoplayVideo('#safety-section'     , '#safetyVideo'   , '#playButtonOverlay');
});
