(function(){
  // GA4 Consent Mode — 이전 선택이 있으면 즉시 반영
  var prev=localStorage.getItem('cookie_consent');
  if(prev==='accepted'&&typeof gtag==='function'){
    gtag('consent','update',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  }
  if(prev)return;
  var b=document.createElement('div');
  b.id='cookie-banner';
  b.setAttribute('role','dialog');
  b.setAttribute('aria-label','Cookie consent');
  b.innerHTML='<div class="cb-inner">'
    +'<p>We use essential cookies for authentication and analytics cookies (Google Analytics) to improve our service. '
    +'<a href="/pages/legal/privacy.html#cookies" style="color:var(--merge-brand-light,#8B7CF0);text-decoration:underline">Learn more</a></p>'
    +'<div class="cb-btns">'
    +'<button id="cb-accept" class="cb-btn cb-primary">Accept All</button>'
    +'<button id="cb-essential" class="cb-btn cb-secondary">Essential Only</button>'
    +'</div></div>';
  var s=document.createElement('style');
  s.textContent='#cookie-banner{position:fixed;bottom:0;left:0;right:0;background:var(--merge-bg-raised,#0E0E14);border-top:1px solid var(--merge-border,rgba(255,255,255,0.06));padding:16px 24px;z-index:9999;font-family:var(--font,Inter,sans-serif);font-size:13px;color:var(--merge-text-secondary,#A1A1AA)}'
    +'.cb-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:20px;flex-wrap:wrap}'
    +'.cb-inner p{flex:1;min-width:280px;margin:0;line-height:1.5}'
    +'.cb-btns{display:flex;gap:8px;flex-shrink:0}'
    +'.cb-btn{padding:8px 18px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;border:none;font-family:var(--font,Inter,sans-serif);transition:all 0.15s}'
    +'.cb-primary{background:var(--merge-brand,#6C5CE7);color:white}'
    +'.cb-primary:hover{opacity:0.9}'
    +'.cb-secondary{background:transparent;border:1px solid var(--merge-border,rgba(255,255,255,0.06));color:var(--merge-text-secondary,#A1A1AA)}'
    +'.cb-secondary:hover{border-color:var(--merge-brand,#6C5CE7)}'
    +'@media(max-width:600px){.cb-inner{flex-direction:column;text-align:center}.cb-btns{width:100%;justify-content:center}}';
  document.head.appendChild(s);
  document.body.appendChild(b);
  document.getElementById('cb-accept').addEventListener('click',function(){
    localStorage.setItem('cookie_consent','accepted');
    if(typeof gtag==='function') gtag('consent','update',{analytics_storage:'granted'});
    b.remove();
  });
  document.getElementById('cb-essential').addEventListener('click',function(){
    localStorage.setItem('cookie_consent','essential');
    if(typeof gtag==='function') gtag('consent','update',{analytics_storage:'denied'});
    b.remove();
  });
})();
