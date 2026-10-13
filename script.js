const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('is-open', !expanded);
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    toggle.focus();
  }
});
const copyButton = document.querySelector('#copy-zelle');
if (copyButton) {
copyButton.setAttribute('aria-live', 'polite');
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('+12135009676');
    copyButton.textContent = 'Copied!';
  } catch {
    copyButton.textContent = 'Select the number above to copy';
  } finally {
    window.translatePage?.();
  }
});

}

const steps = document.querySelectorAll('.journey-step');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  steps.forEach(step => { step.classList.add('will-reveal'); observer.observe(step); });
}
const updateList = document.querySelector('#personal-updates');
if (updateList && Array.isArray(window.leeUpdates) && window.leeUpdates.length) {
  updateList.replaceChildren();
  const element = (tag, cls, text) => { const node = document.createElement(tag); node.className = cls; if (text) node.textContent = text; return node; };
  [...window.leeUpdates].sort((a,b) => (b.date || '').localeCompare(a.date || '')).forEach(update => {
    const card = element('article', 'channel-post'); card.id = 'post-' + update.id;
    const meta = element('div', 'post-meta'); meta.append(element('strong', '', update.author || 'Lee Missions'));
    if (update.date) {
      const time = element('time', '', new Intl.DateTimeFormat('en-GB', {day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(update.date+'T12:00:00Z')));
      time.dateTime = update.date; meta.append(time);
    }
    card.append(meta, element('span', 'post-category', update.category || 'Family update'), element('h3', '', update.title), element('p', '', update.text));
    if (update.image && /^(assets\/|https:\/\/)/.test(update.image)) {
      const photo = element('img', 'post-photo'); photo.src = update.image; photo.alt = update.imageAlt || ''; photo.loading = 'lazy'; card.append(photo);
    }
    if (update.url && /^https:\/\//.test(update.url)) {
      const link = element('a', 'post-link'); link.href = update.url; link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.append(element('span', '', update.linkText || 'Read more ↗'), element('small', '', new URL(update.url).hostname)); card.append(link);
    }
    updateList.append(card);
  });
}

// Horizontal cards remain swipeable; taller desktop screens also pin on vertical scroll.
(() => {
 const section = document.querySelector('.conflict-scroll'); if (!section) return;
 const stage=section.querySelector('.conflict-stage'), track=section.querySelector('.conflict-track'), viewport=section.querySelector('.conflict-window');
 const cards=[...track.children], buttons=[...section.querySelectorAll('[data-conflict-step]')], meter=section.querySelector('.conflict-meter span'), count=section.querySelector('.conflict-count');
 const motion=matchMedia('(prefers-reduced-motion: reduce)'); let distance=0,top=0,active=0,scheduled=false;
 function status(progress){
  active=Math.min(cards.length-1,Math.round(progress*(cards.length-1)));
  cards.forEach((c,i)=>c.classList.toggle('is-current',i===active));
  meter.style.transform=`scaleX(${progress})`;count.textContent=`${active+1} / ${cards.length}`;
  buttons[0].disabled=progress<=.001;buttons[1].disabled=progress>=.999;
 }
 function paint(){scheduled=false;if(section.classList.contains('is-horizontal')){
  const progress=Math.min(1,Math.max(0,(top-section.getBoundingClientRect().top)/distance));
  track.style.transform=`translateX(${-distance*progress}px)`;status(progress);
 }else status(distance?viewport.scrollLeft/distance:0);}
 function setup(){
  section.classList.remove('is-horizontal');section.style.height='';track.style.transform='';
  if (!section.getClientRects().length) return;
  top=(document.querySelector('header')?.getBoundingClientRect().height||0)+12;
  section.style.setProperty('--conflict-top',`${top}px`);
  distance=Math.max(0,track.scrollWidth-viewport.clientWidth);
  if(!motion.matches && innerWidth>=1000 && stage.offsetHeight+top<innerHeight-12 && distance>0){
   viewport.scrollLeft=0;section.classList.add('is-horizontal');section.style.height=`${distance+stage.offsetHeight}px`;
  }
  paint();
 }
 buttons.forEach(button=>button.addEventListener('click',()=>{
  const target=Math.max(0,Math.min(cards.length-1,active+Number(button.dataset.conflictStep)));
  if(section.classList.contains('is-horizontal')) scrollTo({top:scrollY+section.getBoundingClientRect().top-top+distance*target/(cards.length-1),behavior:motion.matches?'instant':'smooth'});
  else viewport.scrollTo({left:distance*target/(cards.length-1),behavior:motion.matches?'instant':'smooth'});
 }));
 viewport.addEventListener('scroll',()=>{if(!section.classList.contains('is-horizontal'))paint();},{passive:true});
 viewport.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();buttons[event.key==='ArrowRight'?1:0].click();}});
 addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(paint);}},{passive:true});
 addEventListener('resize',setup);motion.addEventListener('change',setup);
 section.closest('details')?.addEventListener('toggle',setup);
 document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>requestAnimationFrame(setup)));
 if('ResizeObserver' in window){const observer=new ResizeObserver(setup);const header=document.querySelector('header');if(header)observer.observe(header);}
 document.fonts?.ready.then(setup);setup();
})();

const facebookButton = document.querySelector('#load-facebook');
facebookButton?.addEventListener('click', () => {
  const container = document.querySelector('#facebook-feed');
  if (container.querySelector('iframe')) return;
  const frame = document.createElement('iframe');
  frame.src = container.dataset.src;
  frame.title = 'Lee Missions Facebook posts';
  frame.width = '340'; frame.height = '500'; frame.style.border = '0';
  frame.allow = 'encrypted-media; picture-in-picture';
  container.append(frame); container.hidden = false; facebookButton.hidden = true;
  window.translatePage?.();
});
