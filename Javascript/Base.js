const tabConfig = {
      email:    { type: 'email',  placeholder: 'seu@email.com' },
      telefone: { type: 'tel',    placeholder: '(11) 99999-9999' },
      link:     { type: 'url',    placeholder: 'https://seusite.com.br' }
    };

    function switchTab(btn, type) {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const inp = document.getElementById('register-input');
      inp.type = tabConfig[type].type;
      inp.placeholder = tabConfig[type].placeholder;
      inp.value = '';
      document.getElementById('success-msg').style.display = 'none';
    }

    function handleSubmit() {
      const val = document.getElementById('register-input').value.trim();
      if (!val) {
        document.getElementById('register-input').focus();
        return;
      }
      document.getElementById('register-input').value = '';
      document.getElementById('name-input').value = '';
      const msg = document.getElementById('success-msg');
      msg.style.display = 'block';
      setTimeout(() => msg.style.display = 'none', 4000);
    }