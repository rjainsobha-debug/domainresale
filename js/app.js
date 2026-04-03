const menuBtn = document.querySelector('.mobile-toggle');
const nav = document.querySelector('.nav');
if(menuBtn && nav){
  menuBtn.addEventListener('click', ()=> nav.classList.toggle('open'));
}

document.querySelectorAll('[data-copy]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const value = btn.getAttribute('data-copy');
    navigator.clipboard.writeText(value).then(()=>{
      const old = btn.textContent;
      btn.textContent = 'Copied';
      setTimeout(()=>btn.textContent = old, 1400);
    });
  });
});

document.querySelectorAll('[data-pill-domain]').forEach(pill=>{
  pill.addEventListener('click', ()=>{
    const input = document.querySelector('#domainQuery');
    if(input){
      input.value = pill.getAttribute('data-pill-domain');
      input.focus();
    }
  });
});

function suggestDomainVariants(q){
  const clean = (q || '').toLowerCase().trim().replace(/\s+/g, '');
  if(!clean) return [];
  return [
    `${clean}.com`,
    `${clean}.in`,
    `get${clean}.com`,
    `${clean}hq.com`,
    `${clean}online.in`,
    `try${clean}.co`
  ];
}

const searchBtn = document.querySelector('#searchBtn');
const domainInput = document.querySelector('#domainQuery');
const resultsWrap = document.querySelector('#suggestResults');

function renderSuggestions(){
  if(!domainInput || !resultsWrap) return;
  const items = suggestDomainVariants(domainInput.value);
  resultsWrap.innerHTML = items.length ? items.map((item, i)=>`
    <div class="mini-row">
      <strong>${item}</strong>
      <span>${i < 2 ? '<span class="badge badge-success">Likely Available</span>' : '<span class="badge">Brandable</span>'}</span>
      <span>${i === 0 ? 'Best for trust' : i === 1 ? 'India focused' : 'Growth ready'}</span>
      <span><a class="btn btn-small btn-secondary" href="#providers">Check Providers</a></span>
    </div>
  `).join('') : `
    <div class="tip">Type your business or website idea above to generate domain-style suggestions.</div>
  `;
}
if(searchBtn){
  searchBtn.addEventListener('click', renderSuggestions);
}
if(domainInput){
  domainInput.addEventListener('keydown', e=>{
    if(e.key === 'Enter'){
      e.preventDefault();
      renderSuggestions();
    }
  });
}

document.querySelectorAll('[data-filter]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const group = btn.getAttribute('data-filter-group');
    const value = btn.getAttribute('data-filter');
    document.querySelectorAll(`[data-filter-group="${group}"]`).forEach(x=>x.classList.remove('active'));
    btn.classList.add('active');
    const cards = document.querySelectorAll('[data-card-type]');
    cards.forEach(card=>{
      card.style.display = (value === 'all' || card.getAttribute('data-card-type') === value) ? '' : 'none';
    });
  });
});
