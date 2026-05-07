 /* ---------- ELEMENTOS ---------- */
    const elTitle     = document.getElementById('doc-title');
    const elSubtitle  = document.getElementById('doc-subtitle');
    const elBody      = document.getElementById('doc-body');
    const elFilename  = document.getElementById('doc-filename');
    const elStatusDot = document.getElementById('status-dot');
    const elStatusTxt = document.getElementById('status-text');
    const elMetaFile  = document.getElementById('meta-filename');
    const elMetaDate  = document.getElementById('meta-date');
    const elMetaWords = document.getElementById('meta-words');
    const elChars     = document.getElementById('count-chars');
    const elTime      = document.getElementById('count-time');

    let timerSalvar;

    /* ---------- DATA ---------- */
    function formatarData() {
      return new Date().toLocaleDateString('pt-BR', {
        day: '2-digit', month: 'long', year: 'numeric'
      });
    }
    elMetaDate.textContent = formatarData();

    /* ---------- AUTO-RESIZE TEXTAREA ---------- */
    function autoResize(el) {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    }

    /* ---------- AO EDITAR ---------- */
    function aoEditar() {
      /* Status */
      elStatusDot.classList.add('editing');
      elStatusTxt.textContent = 'Editando…';

      /* Contadores */
      const texto = elBody.value;
      const palavras = texto.trim() === '' ? 0 : texto.trim().split(/\s+/).length;
      const chars    = texto.length;
      const minutos  = Math.max(1, Math.round(palavras / 200));

      elMetaWords.textContent = palavras + ' ' + (palavras === 1 ? 'palavra' : 'palavras');
      elChars.textContent     = chars + ' caracteres';
      elTime.textContent      = 'Leitura: ~' + minutos + ' min';

      /* Sincroniza nome */
      elMetaFile.textContent = elFilename.value || 'Documento sem título';

      /* Auto-salvar após 1.8s sem digitar */
      clearTimeout(timerSalvar);
      timerSalvar = setTimeout(() => {
        marcarSalvo();
      }, 1800);
    }

    /* ---------- NOME DO ARQUIVO ---------- */
    elFilename.addEventListener('input', () => {
      elMetaFile.textContent = elFilename.value || 'Documento sem título';
      document.title = (elFilename.value || 'Documento') + ' — MinhaMarca';
    });

    /* ---------- MARCAR SALVO ---------- */
    function marcarSalvo() {
      elStatusDot.classList.remove('editing');
      elStatusTxt.textContent = 'Salvo';
    }

    /* ---------- SALVAR ---------- */
    function salvarDoc() {
      marcarSalvo();
      mostrarToast('✓', 'Documento salvo com sucesso!');
    }

    /* ---------- EXPORTAR .TXT ---------- */
    function exportarDoc() {
      const titulo    = elTitle.value || 'Sem título';
      const subtitulo = elSubtitle.value;
      const corpo     = elBody.value;
      const sep       = '═'.repeat(48);

      const conteudo = [
        titulo.toUpperCase(),
        subtitulo,
        sep,
        '',
        corpo,
        '',
        sep,
        'Exportado em ' + new Date().toLocaleString('pt-BR')
      ].filter(l => l !== undefined).join('\n');

      const blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });
      const a    = document.createElement('a');
      a.href     = URL.createObjectURL(blob);
      a.download = (elFilename.value || 'documento').replace(/[^a-zA-Z0-9À-úÀ-ÿ _-]/g, '') + '.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      mostrarToast('↓', 'Arquivo exportado!');
    }

   
    function mostrarToast(icone, msg) {
      const t = document.getElementById('toast');
      document.getElementById('toast-icon').textContent = icone;
      document.getElementById('toast-msg').textContent  = msg;
      t.classList.add('show');
      setTimeout(() => t.classList.remove('show'), 3000);
    }

    
   [elTitle, elSubtitle, elBody].forEach(el => autoResize(el));