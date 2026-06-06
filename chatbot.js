(function () {
  'use strict';

  var EMAILJS_PUBLIC_KEY  = 'g7_awUpVEpp6pyQes';
  var EMAILJS_SERVICE_ID  = 'service_nueo66p';
  var EMAILJS_TEMPLATE_ID = 'template_qynq0uj';
  var OFFICE_EMAIL        = 'nicolascojocari@yahoo.fr';

  var state     = 'idle';
  var userEmail = '';
  var userTopic = '';

  // ── CSS ─────────────────────────────────────────────────────────
  var style = document.createElement('style');
  style.textContent = [
    '#cb-bubble{position:fixed!important;bottom:1.75rem!important;right:1.75rem!important;',
    'width:56px!important;height:56px!important;border-radius:50%!important;',
    'background:#00B4CC!important;color:#fff!important;border:none!important;',
    'cursor:pointer!important;pointer-events:all!important;padding:0!important;',
    'display:flex!important;align-items:center!important;justify-content:center!important;',
    'box-shadow:0 4px 20px rgba(0,180,204,0.4)!important;z-index:99999!important;',
    'transition:background 0.2s,transform 0.2s!important;}',
    '#cb-bubble:hover{background:#009db3!important;transform:scale(1.08)!important;}',
    '#cb-bubble::after{content:"";position:absolute;top:3px;right:3px;width:12px;height:12px;',
    'background:#ff5c5c;border-radius:50%;border:2px solid #fff;animation:cb-pulse 2s infinite;}',
    '#cb-bubble.open::after{display:none;}',
    '@keyframes cb-pulse{0%,100%{transform:scale(1);}50%{transform:scale(1.25);}}',
    '.cb-ico-close{display:none!important;}',
    '#cb-bubble.open .cb-ico-chat{display:none!important;}',
    '#cb-bubble.open .cb-ico-close{display:flex!important;}',
    '#cb-teaser{position:fixed;bottom:5.2rem;right:1.75rem;background:#fff;color:#1a2b2e;',
    'padding:0.75rem 1rem;border-radius:12px 12px 4px 12px;',
    'box-shadow:0 4px 20px rgba(0,0,0,0.13);font-size:0.875rem;',
    'font-family:Inter,sans-serif;line-height:1.4;max-width:220px;z-index:99998;cursor:pointer;',
    'opacity:0;transform:translateY(8px) scale(0.95);',
    'transition:opacity 0.3s ease,transform 0.3s ease;pointer-events:none;}',
    '#cb-teaser.visible{opacity:1;transform:translateY(0) scale(1);pointer-events:all;}',
    '#cb-teaser-close{position:absolute;top:-6px;left:-6px;width:18px;height:18px;',
    'border-radius:50%;background:#9bbfc4;color:#fff;border:none;cursor:pointer;',
    'font-size:10px;display:flex;align-items:center;justify-content:center;}',
    '#cb-teaser-close:hover{background:#5a7a80;}',
    '#cb-window{position:fixed;bottom:5.5rem;right:1.75rem;width:360px;max-height:540px;',
    'background:#fff;border-radius:12px;box-shadow:0 12px 48px rgba(0,0,0,0.15);',
    'display:flex;flex-direction:column;overflow:hidden;z-index:99997;',
    'transform:scale(0.92) translateY(12px);opacity:0;pointer-events:none;',
    'transition:transform 0.22s cubic-bezier(.34,1.46,.64,1),opacity 0.18s ease;',
    'transform-origin:bottom right;font-family:Inter,sans-serif;}',
    '#cb-window.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all;}',
    '.cb-header{background:linear-gradient(135deg,#00B4CC 0%,#0091a8 100%);color:#fff;',
    'padding:1.1rem 1.25rem;display:flex;align-items:center;gap:0.85rem;flex-shrink:0;}',
    '.cb-avatar{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,0.2);',
    'display:flex;align-items:center;justify-content:center;flex-shrink:0;}',
    '.cb-header-info h3{font-size:0.9rem;font-weight:600;margin:0;color:#fff!important;}',
    '.cb-header-info p{font-size:0.72rem;opacity:0.8;margin:2px 0 0;color:#fff!important;}',
    '#cb-close{margin-left:auto;background:rgba(255,255,255,0.15);border:none;border-radius:50%;',
    'width:30px;height:30px;display:flex;align-items:center;justify-content:center;',
    'cursor:pointer;color:#fff;flex-shrink:0;transition:background 0.15s;}',
    '#cb-close:hover{background:rgba(255,255,255,0.3);}',
    '.cb-status{width:8px;height:8px;background:#4ade80;border-radius:50%;',
    'display:inline-block;margin-right:4px;vertical-align:middle;}',
    '.cb-msgs{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;',
    'gap:0.85rem;background:#f8fbfc;}',
    '.cb-msgs::-webkit-scrollbar{width:4px;}',
    '.cb-msgs::-webkit-scrollbar-thumb{background:#c8dde1;border-radius:2px;}',
    '.cb-msg{display:flex;gap:0.6rem;align-items:flex-end;animation:cb-up 0.22s ease;}',
    '@keyframes cb-up{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}',
    '.cb-msg-av{width:28px;height:28px;border-radius:50%;background:#00B4CC;color:#fff;',
    'display:flex;align-items:center;justify-content:center;font-size:0.62rem;',
    'font-weight:700;flex-shrink:0;font-family:Inter,sans-serif;}',
    '.cb-msg-bbl{max-width:78%;padding:0.65rem 0.9rem;border-radius:14px 14px 14px 4px;',
    'font-size:0.845rem;line-height:1.55;background:#fff;color:#1a2b2e;',
    'box-shadow:0 1px 4px rgba(0,0,0,0.07);font-family:Inter,sans-serif;}',
    '.cb-msg.user{flex-direction:row-reverse;}',
    '.cb-msg.user .cb-msg-bbl{background:#00B4CC;color:#fff;border-radius:14px 14px 4px 14px;}',
    '.cb-msg.user .cb-msg-av{background:#e4f4f8;color:#00B4CC;}',
    '.cb-dots{display:flex;gap:4px;align-items:center;padding:2px 4px;}',
    '.cb-dots span{width:6px;height:6px;background:#9bbfc4;border-radius:50%;',
    'animation:cb-blink 1.2s infinite;}',
    '.cb-dots span:nth-child(2){animation-delay:0.2s;}',
    '.cb-dots span:nth-child(3){animation-delay:0.4s;}',
    '@keyframes cb-blink{0%,80%,100%{opacity:.3;transform:scale(1);}40%{opacity:1;transform:scale(1.2);}}',
    '.cb-footer{padding:0.85rem 1rem;background:#fff;border-top:1px solid #e4eef0;flex-shrink:0;}',
    '.cb-step-email{display:flex;gap:0.5rem;}',
    '.cb-step-email input{flex:1;border:1px solid #c8dde1;border-radius:8px;',
    'padding:0.6rem 0.85rem;font-size:0.845rem;font-family:Inter,sans-serif;',
    'color:#1a2b2e;outline:none;transition:border-color 0.15s;background:#fff;}',
    '.cb-step-email input:focus{border-color:#00B4CC;}',
    '.cb-step-email input::placeholder{color:#9bbfc4;}',
    '.cb-step-msg{display:flex;flex-direction:column;gap:0.5rem;}',
    '.cb-step-msg textarea{border:1px solid #c8dde1;border-radius:8px;',
    'padding:0.6rem 0.85rem;font-size:0.845rem;font-family:Inter,sans-serif;',
    'color:#1a2b2e;resize:none;outline:none;line-height:1.5;height:80px;',
    'transition:border-color 0.15s;background:#fff;}',
    '.cb-step-msg textarea:focus{border-color:#00B4CC;}',
    '.cb-step-msg textarea::placeholder{color:#9bbfc4;}',
    '.cb-step-msg-row{display:flex;justify-content:flex-end;}',
    '.cb-btn{background:#00B4CC;color:#fff;border:none;border-radius:8px;',
    'padding:0.55rem 1rem;font-size:0.78rem;font-weight:700;letter-spacing:0.06em;',
    'text-transform:uppercase;cursor:pointer;display:flex;align-items:center;gap:0.4rem;',
    'transition:background 0.15s;font-family:Inter,sans-serif;}',
    '.cb-btn:hover{background:#009db3;}',
    '.cb-quick{display:flex;flex-wrap:wrap;gap:0.4rem;margin-top:0.5rem;}',
    '.cb-chip{font-size:0.72rem;font-weight:500;padding:0.3rem 0.65rem;',
    'border:1px solid #c8dde1;border-radius:20px;cursor:pointer;background:#fff;',
    'color:#2d6b76;transition:all 0.15s;white-space:nowrap;font-family:Inter,sans-serif;}',
    '.cb-chip:hover,.cb-chip.selected{border-color:#00B4CC;background:#e4f4f8;color:#00B4CC;}',
    '.cb-success{text-align:center;padding:0.5rem 0;}',
    '.cb-success-icon{width:44px;height:44px;border-radius:50%;background:#e8f9ee;color:#22c55e;',
    'display:flex;align-items:center;justify-content:center;margin:0 auto 0.75rem;}',
    '.cb-success h4{font-size:0.9rem;font-weight:600;margin:0 0 0.35rem;font-family:Inter,sans-serif;}',
    '.cb-success p{font-size:0.8rem;color:#5a7a80;line-height:1.5;margin:0;font-family:Inter,sans-serif;}',
    '@media(max-width:420px){#cb-window{width:calc(100vw - 2rem);right:1rem;}',
    '#cb-bubble{right:1rem!important;bottom:1rem!important;}}'
  ].join('');
  document.head.appendChild(style);

  // ── HTML ─────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    if (window.emailjs) emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

    var wrap = document.createElement('div');
    wrap.innerHTML =
      '<div id="cb-teaser">' +
        '<button id="cb-teaser-close" type="button" aria-label="Fermer">✕</button>' +
        'Bonjour 👋 Comment pouvons-nous vous aider ?' +
      '</div>' +
      '<button id="cb-bubble" type="button" aria-label="Ouvrir le chat">' +
        '<svg class="cb-ico-chat" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' +
        '<svg class="cb-ico-close" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
      '</button>' +
      '<div id="cb-window" role="dialog" aria-label="Chat Étude Borremans">' +
        '<div class="cb-header">' +
          '<div class="cb-avatar">' +
            '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' +
          '</div>' +
          '<div class="cb-header-info">' +
            '<h3>Étude Borremans</h3>' +
            '<p><span class="cb-status"></span>En ligne · Réponse dans les plus brefs délais</p>' +
          '</div>' +
          '<button id="cb-close" type="button" aria-label="Fermer le chat">' +
            '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="cb-msgs" id="cb-msgs"></div>' +
        '<div class="cb-footer" id="cb-footer"></div>' +
      '</div>';
    document.body.appendChild(wrap);

    var teaser = document.getElementById('cb-teaser');
    var bubble = document.getElementById('cb-bubble');
    var win    = document.getElementById('cb-window');

    // Teaser appears after 3s, once per session
    if (!sessionStorage.getItem('cb-seen')) {
      setTimeout(function () { teaser.classList.add('visible'); }, 3000);
    }

    function dismissTeaser() {
      teaser.classList.remove('visible');
      sessionStorage.setItem('cb-seen', '1');
    }

    function openChat() {
      dismissTeaser();
      bubble.classList.add('open');
      win.classList.add('open');
      if (state === 'idle') startChat();
    }

    function closeChat() {
      bubble.classList.remove('open');
      win.classList.remove('open');
    }

    document.getElementById('cb-teaser-close').addEventListener('click', function (e) {
      e.stopPropagation();
      dismissTeaser();
    });

    document.getElementById('cb-close').addEventListener('click', closeChat);

    teaser.addEventListener('click', function () {
      openChat();
    });

    bubble.addEventListener('click', function () {
      if (win.classList.contains('open')) {
        closeChat();
      } else {
        openChat();
      }
    });

    // ── Chat logic ───────────────────────────────────────────────

    function startChat() {
      state = 'email';
      addMsg('Bonjour ! Bienvenue à l’étude Borremans.<br>Pour vous répondre, commencez par indiquer votre adresse e-mail.', 'bot', 600)
        .then(renderEmailStep);
    }

    function addMsg(text, from, delay) {
      return new Promise(function (resolve) {
        var c = document.getElementById('cb-msgs');
        if (from === 'bot' && delay > 0) {
          var t = document.createElement('div');
          t.className = 'cb-msg'; t.id = 'cb-typing';
          t.innerHTML = '<div class="cb-msg-av">SB</div><div class="cb-msg-bbl"><div class="cb-dots"><span></span><span></span><span></span></div></div>';
          c.appendChild(t); c.scrollTop = c.scrollHeight;
        }
        setTimeout(function () {
          var ti = document.getElementById('cb-typing');
          if (ti) ti.remove();
          var el = document.createElement('div');
          el.className = 'cb-msg' + (from === 'user' ? ' user' : '');
          el.innerHTML = from === 'bot'
            ? '<div class="cb-msg-av">SB</div><div class="cb-msg-bbl">' + text + '</div>'
            : '<div class="cb-msg-av" style="background:#e4f4f8;color:#00B4CC">Vous</div><div class="cb-msg-bbl">' + text + '</div>';
          c.appendChild(el); c.scrollTop = c.scrollHeight; resolve();
        }, delay);
      });
    }

    function setFooter(h) { document.getElementById('cb-footer').innerHTML = h; }

    function renderEmailStep() {
      setFooter(
        '<div class="cb-step-email">' +
          '<input type="email" id="cb-ei" placeholder="votre@email.com" autocomplete="email"/>' +
          '<button class="cb-btn" id="cb-eb" type="button">' +
            '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>' +
          '</button>' +
        '</div>'
      );
      var inp = document.getElementById('cb-ei');
      if (inp) {
        inp.focus();
        inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') submitEmail(); });
      }
      var btn = document.getElementById('cb-eb');
      if (btn) btn.addEventListener('click', submitEmail);
    }

    function submitEmail() {
      var inp = document.getElementById('cb-ei');
      if (!inp) return;
      var val = inp.value.trim();
      if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        inp.style.borderColor = '#ef4444'; inp.focus();
        setTimeout(function () { inp.style.borderColor = ''; }, 1500);
        return;
      }
      userEmail = val; state = 'message'; setFooter('');
      addMsg(val, 'user', 0)
        .then(function () { return addMsg('Merci ! Quel est l’objet de votre demande ?', 'bot', 800); })
        .then(renderMsgStep);
    }

    function renderMsgStep() {
      var topics = ['Immobilier', 'Succession', 'Famille', 'Vente publique', 'Entreprise', 'Autre'];
      var chips = topics.map(function (t) {
        return '<button class="cb-chip" type="button" data-topic="' + t + '">' + t + '</button>';
      }).join('');
      setFooter(
        '<div class="cb-step-msg">' +
          '<div class="cb-quick">' + chips + '</div>' +
          '<textarea id="cb-ti" placeholder="Décrivez votre demande…"></textarea>' +
          '<div class="cb-step-msg-row">' +
            '<button class="cb-btn" id="cb-sb" type="button">' +
              '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/></svg>' +
              ' Envoyer' +
            '</button>' +
          '</div>' +
        '</div>'
      );
      document.querySelectorAll('.cb-chip').forEach(function (c) {
        c.addEventListener('click', function () {
          userTopic = c.dataset.topic;
          document.querySelectorAll('.cb-chip').forEach(function (x) { x.classList.remove('selected'); });
          c.classList.add('selected');
          var ta = document.getElementById('cb-ti');
          if (ta && !ta.value) ta.placeholder = 'Votre demande concernant : ' + userTopic + '…';
        });
      });
      var sb = document.getElementById('cb-sb');
      if (sb) sb.addEventListener('click', submitMsg);
      var ta = document.getElementById('cb-ti');
      if (ta) ta.focus();
    }

    function submitMsg() {
      var ta = document.getElementById('cb-ti');
      if (!ta) return;
      var msg = ta.value.trim();
      if (!msg) {
        ta.style.borderColor = '#ef4444'; ta.focus();
        setTimeout(function () { ta.style.borderColor = ''; }, 1500);
        return;
      }
      state = 'done'; setFooter('');
      addMsg(msg, 'user', 0).then(function () {
        return sendEmail(userEmail, userTopic || 'Demande générale', msg);
      }).then(function () {
        return addMsg('Votre message a bien été envoyé ! 🎉<br>Notre équipe vous contactera dans les plus brefs délais.', 'bot', 900);
      }).then(function () {
        setFooter(
          '<div class="cb-success">' +
            '<div class="cb-success-icon"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>' +
            '<h4>Demande envoyée</h4>' +
            '<p>Nous vous répondrons dans les plus brefs délais.</p>' +
          '</div>'
        );
      }).catch(function () {
        state = 'message';
        addMsg('Une erreur est survenue. Contactez-nous au <strong>02 734 86 38</strong> ou à <a href="mailto:info@notbm.be" style="color:#00B4CC">info@notbm.be</a>.', 'bot', 400);
        setFooter('');
      });
    }

    function sendEmail(email, subject, body) {
      return new Promise(function (resolve, reject) {
        if (window.emailjs) {
          emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            to_email:   OFFICE_EMAIL,
            email:      OFFICE_EMAIL,
            from_email: email,
            reply_to:   email,
            sujet:      subject,
            subject:    subject,
            message:    body
          }).then(function () {
            resolve();
          }).catch(function (err) {
            console.error('EmailJS status:', err && err.status);
            console.error('EmailJS text:', err && err.text);
            reject(err);
          });
        } else {
          reject(new Error('EmailJS not loaded'));
        }
      });
    }
  });
})();
