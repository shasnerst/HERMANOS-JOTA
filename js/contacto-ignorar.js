// Footer year
// Footer year

(function(){ const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear(); })();

(function(){
  const form = document.getElementById('contactForm');
  if (!form) return;

  const btn = document.getElementById('submitBtn');
  const result = document.getElementById('result');

  const nameEl = document.getElementById('name');
  const emailEl = document.getElementById('email');
  const msgEl = document.getElementById('message');

  const errName = document.getElementById('err-name');
  const errEmail = document.getElementById('err-email');
  const errMsg = document.getElementById('err-message');

  function showError(el, msg){
    el.textContent = msg;
    el.classList.remove('hidden');
  }
  function clearError(el){
    el.textContent = '';
    el.classList.add('hidden');
  }

  function validate(){
    let ok = true;
    clearError(errName); clearError(errEmail); clearError(errMsg);

    const name = nameEl.value.trim();
    if (name.length < 2){
      showError(errName, 'Ingresá tu nombre (mínimo 2 caracteres).');
      ok = false;
    }

    const email = emailEl.value.trim();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)){
      showError(errEmail, 'Ingresá un email válido.');
      ok = false;
    }

    const msg = msgEl.value.trim();
    if (msg.length < 10){
      showError(errMsg, 'El mensaje debe tener al menos 10 caracteres.');
      ok = false;
    }

    return ok;
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if (!validate()) return;

    btn.disabled = true;
    btn.textContent = 'Enviando...';

    // Simular envío (si tu backend está listo reemplazar por fetch)
    setTimeout(() => {
      result.innerHTML = '<div class="success" role="status">Gracias — tu mensaje fue enviado correctamente. Te responderemos pronto.</div>';
      form.reset();
      btn.disabled = false;
      btn.textContent = 'Enviar mensaje';
      result.scrollIntoView({behavior:'smooth', block:'center'});
    }, 600);
  });

  // validación en tiempo real
  nameEl.addEventListener('input', () => { if (nameEl.value.trim().length >= 2) clearError(errName); });
  emailEl.addEventListener('input', () => { const re=/^[^\s@]+@[^\s@]+\.[^\s@]+$/; if(re.test(emailEl.value.trim())) clearError(errEmail); });
    msgEl.addEventListener('input', () => {
      if (msgEl.value.trim().length >= 10) clearError(errMsg);
    });
  });