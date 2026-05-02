// admin 공통 모달 — prompt() 8연속 → 모달 폼 교체용
// 작성: C(프론트) | 2026-05-01 (D-5)
// 사용처: admin/themes.html, admin/components.html, admin/releases.html, admin/subscribers.html
//
// API:
//   AdminModal.showFormModal({
//     title: 'Edit theme',
//     fields: [
//       { name:'name', label:'Name', type:'text', value:'', required:true },
//       { name:'slug', label:'Slug', type:'text', value:'', pattern:'^[a-z0-9_-]+$', help:'lowercase, digits, hyphen, underscore' },
//       { name:'badge', label:'Badge', type:'select', options:['free','pro','new'], value:'free' },
//       { name:'is_public', label:'Public', type:'checkbox', value:true }
//     ],
//     submitLabel: 'Save',
//     onSubmit: async function(values){ /* return falsy to keep open + show error, throw to display */ }
//   }).then(function(values){ /* values = null on cancel, object on success */ });
//
//   AdminModal.showConfirm({
//     title: 'Delete theme',
//     message: 'This action cannot be undone.',
//     confirmLabel: 'Delete',
//     destructive: true
//   }).then(function(ok){ /* ok = true|false */ });

(function(){
  if (window.AdminModal) return;

  var STYLE_ID = 'admin-modal-styles';
  function injectStyles(){
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent =
      '.am-overlay{position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.55);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:20px;animation:am-fade .15s ease-out}'+
      '.am-card{width:100%;max-width:480px;max-height:calc(100vh - 40px);overflow:auto;background:var(--merge-bg-raised);border:1px solid var(--merge-border-strong);border-radius:14px;font-family:var(--merge-font);color:var(--merge-text-primary);padding:24px;display:flex;flex-direction:column;gap:14px;animation:am-pop .18s ease-out}'+
      '.am-title{margin:0;font-size:17px;font-weight:700}'+
      '.am-body{margin:0;font-size:14px;line-height:1.55;color:var(--merge-text-secondary)}'+
      '.am-field{display:flex;flex-direction:column;gap:5px}'+
      '.am-field label{font-size:12px;font-weight:600;color:var(--merge-text-primary)}'+
      '.am-field input[type=text],.am-field input[type=number],.am-field input[type=email],.am-field input[type=url],.am-field textarea,.am-field select{padding:9px 12px;background:var(--merge-bg-surface);border:1px solid var(--merge-border-strong);border-radius:8px;font:inherit;font-size:14px;color:var(--merge-text-primary);outline:none;transition:border-color .12s,box-shadow .12s}'+
      '.am-field input:focus,.am-field textarea:focus,.am-field select:focus{border-color:var(--merge-brand);box-shadow:0 0 0 3px rgba(108,92,231,.18)}'+
      '.am-field textarea{min-height:80px;resize:vertical;font-family:inherit}'+
      '.am-field .am-help{font-size:11px;color:var(--merge-text-muted)}'+
      '.am-field .am-help.error{color:var(--merge-error)}'+
      '.am-field-check{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--merge-text-secondary)}'+
      '.am-field-check input{width:16px;height:16px;accent-color:var(--merge-brand)}'+
      '.am-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:6px}'+
      '.am-btn{display:inline-flex;align-items:center;justify-content:center;padding:8px 16px;font:600 13px var(--merge-font);border:1px solid transparent;border-radius:8px;cursor:pointer;transition:all .12s}'+
      '.am-btn:focus-visible{outline:2px solid var(--merge-brand);outline-offset:2px}'+
      '.am-btn-ghost{background:transparent;color:var(--merge-text-secondary)}'+
      '.am-btn-ghost:hover{background:var(--merge-bg-surface);color:var(--merge-text-primary)}'+
      '.am-btn-primary{background:var(--merge-brand);color:#fff}'+
      '.am-btn-primary:hover{background:var(--merge-brand-light)}'+
      '.am-btn-primary:disabled{opacity:.6;cursor:not-allowed}'+
      '.am-btn-danger{background:var(--merge-error);color:#fff}'+
      '.am-btn-danger:hover{background:#DC2626}'+
      '.am-error{padding:8px 12px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.25);border-radius:6px;font-size:12px;color:#FCA5A5}'+
      '@keyframes am-fade{from{opacity:0}to{opacity:1}}'+
      '@keyframes am-pop{from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:none}}';
    document.head.appendChild(s);
  }

  function escapeAttr(v){ return String(v == null ? '' : v).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function trapFocus(card){
    var focusable = card.querySelectorAll('input,select,textarea,button,[tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    var first = focusable[0], last = focusable[focusable.length - 1];
    card.addEventListener('keydown', function(e){
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  function open(buildContent){
    injectStyles();
    return new Promise(function(resolve){
      var overlay = document.createElement('div');
      overlay.className = 'am-overlay';
      overlay.setAttribute('role','dialog');
      overlay.setAttribute('aria-modal','true');

      var prevFocus = document.activeElement;
      var card = document.createElement('div');
      card.className = 'am-card';
      overlay.appendChild(card);

      function close(value){
        document.removeEventListener('keydown', onKey);
        overlay.remove();
        if (prevFocus && typeof prevFocus.focus === 'function') prevFocus.focus();
        resolve(value);
      }
      function onKey(e){
        if (e.key === 'Escape') { e.preventDefault(); close(null); }
      }
      overlay.addEventListener('mousedown', function(e){
        if (e.target === overlay) close(null);
      });
      document.addEventListener('keydown', onKey);

      buildContent(card, close);
      document.body.appendChild(overlay);
      trapFocus(card);

      // 첫 입력에 포커스, 없으면 첫 버튼
      var first = card.querySelector('input,select,textarea');
      if (!first) first = card.querySelector('button');
      if (first) setTimeout(function(){ first.focus(); }, 0);
    });
  }

  function showConfirm(opts){
    opts = opts || {};
    return open(function(card, close){
      var titleId = 'am-t-' + Date.now();
      card.setAttribute('aria-labelledby', titleId);
      card.innerHTML =
        '<h3 id="'+titleId+'" class="am-title">'+escapeAttr(opts.title || 'Confirm')+'</h3>'+
        '<p class="am-body">'+escapeAttr(opts.message || '')+'</p>'+
        '<div class="am-actions">'+
          '<button type="button" class="am-btn am-btn-ghost" data-act="cancel">'+escapeAttr(opts.cancelLabel || 'Cancel')+'</button>'+
          '<button type="button" class="am-btn '+(opts.destructive ? 'am-btn-danger' : 'am-btn-primary')+'" data-act="ok">'+escapeAttr(opts.confirmLabel || 'OK')+'</button>'+
        '</div>';
      card.querySelector('[data-act=cancel]').addEventListener('click', function(){ close(false); });
      card.querySelector('[data-act=ok]').addEventListener('click', function(){ close(true); });
    });
  }

  function showFormModal(opts){
    opts = opts || {};
    var fields = Array.isArray(opts.fields) ? opts.fields : [];
    return open(function(card, close){
      var titleId = 'am-t-' + Date.now();
      card.setAttribute('aria-labelledby', titleId);

      var fieldsHtml = fields.map(function(f, i){
        var id = 'am-f-' + i;
        var v = f.value == null ? '' : f.value;
        if (f.type === 'checkbox') {
          return '<label class="am-field-check"><input id="'+id+'" type="checkbox" data-name="'+escapeAttr(f.name)+'"'+(v ? ' checked' : '')+'> '+escapeAttr(f.label)+'</label>';
        }
        var input;
        if (f.type === 'select') {
          var opts2 = (f.options || []).map(function(o){
            var ov = (typeof o === 'object') ? o.value : o;
            var ol = (typeof o === 'object') ? o.label : o;
            return '<option value="'+escapeAttr(ov)+'"'+(String(ov) === String(v) ? ' selected' : '')+'>'+escapeAttr(ol)+'</option>';
          }).join('');
          input = '<select id="'+id+'" data-name="'+escapeAttr(f.name)+'"'+(f.required ? ' required' : '')+'>'+opts2+'</select>';
        } else if (f.type === 'textarea') {
          input = '<textarea id="'+id+'" data-name="'+escapeAttr(f.name)+'"'+(f.required ? ' required' : '')+' placeholder="'+escapeAttr(f.placeholder || '')+'">'+escapeAttr(v)+'</textarea>';
        } else {
          var t = f.type || 'text';
          input = '<input id="'+id+'" type="'+escapeAttr(t)+'" data-name="'+escapeAttr(f.name)+'" value="'+escapeAttr(v)+'"'+
            (f.required ? ' required' : '')+
            (f.pattern ? ' pattern="'+escapeAttr(f.pattern)+'"' : '')+
            (f.placeholder ? ' placeholder="'+escapeAttr(f.placeholder)+'"' : '')+
            '>';
        }
        return '<div class="am-field"><label for="'+id+'">'+escapeAttr(f.label || f.name)+'</label>'+input+
          (f.help ? '<span class="am-help">'+escapeAttr(f.help)+'</span>' : '')+'</div>';
      }).join('');

      card.innerHTML =
        '<h3 id="'+titleId+'" class="am-title">'+escapeAttr(opts.title || 'Form')+'</h3>'+
        (opts.description ? '<p class="am-body">'+escapeAttr(opts.description)+'</p>' : '')+
        '<form class="am-form" novalidate>'+
          fieldsHtml +
          '<div class="am-error" hidden></div>'+
          '<div class="am-actions">'+
            '<button type="button" class="am-btn am-btn-ghost" data-act="cancel">'+escapeAttr(opts.cancelLabel || 'Cancel')+'</button>'+
            '<button type="submit" class="am-btn am-btn-primary">'+escapeAttr(opts.submitLabel || 'Save')+'</button>'+
          '</div>'+
        '</form>';

      var form = card.querySelector('form');
      var errorBox = card.querySelector('.am-error');
      card.querySelector('[data-act=cancel]').addEventListener('click', function(){ close(null); });

      form.addEventListener('submit', async function(e){
        e.preventDefault();
        errorBox.hidden = true; errorBox.textContent = '';
        // collect
        var values = {};
        var inputs = form.querySelectorAll('[data-name]');
        var invalid = false;
        inputs.forEach(function(el){
          var name = el.getAttribute('data-name');
          if (el.type === 'checkbox') values[name] = !!el.checked;
          else values[name] = el.value;
          if (el.required && !String(values[name]).trim()) { invalid = true; }
          if (el.pattern && el.value && !new RegExp('^(?:' + el.pattern + ')$').test(el.value)) { invalid = true; }
        });
        if (invalid) {
          errorBox.textContent = 'Please check the highlighted fields.';
          errorBox.hidden = false;
          return;
        }
        var submitBtn = form.querySelector('button[type=submit]');
        submitBtn.disabled = true;
        try {
          if (typeof opts.onSubmit === 'function') {
            var result = await opts.onSubmit(values);
            if (result === false) { submitBtn.disabled = false; return; }
          }
          close(values);
        } catch(err) {
          errorBox.textContent = (err && err.message) || 'Operation failed.';
          errorBox.hidden = false;
          submitBtn.disabled = false;
        }
      });
    });
  }

  window.AdminModal = {
    showFormModal: showFormModal,
    showConfirm: showConfirm
  };
})();
