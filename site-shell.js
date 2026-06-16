(() => {
  const nav = document.querySelector('.site-nav, body > nav');
  if (!nav) return;

  const whatsapp = 'https://wa.me/5511947388423?text=Ol%C3%A1%20Michelle%2C%20gostaria%20de%20agendar%20uma%20conversa%20inicial.';

  document.body.classList.remove('has-desktop-sidebar');
  document.querySelector('[data-desktop-sidebar]')?.remove();
  document.querySelector('[data-mobile-menu]')?.remove();

  nav.className = 'site-nav unified-nav';
  nav.setAttribute('aria-label', 'Navega\u00e7\u00e3o principal');
  nav.innerHTML = `
    <a href="index.html" class="brand" aria-label="Psicologia Real - in\u00edcio">Psicologia <span>Real</span></a>
    <div class="nav-links" aria-label="Menu principal">
      <a href="terapia.html">Terapia</a>
      <a href="ansiedade.html">Ansiedade</a>
      <a href="supervisao.html">Supervis\u00e3o</a>
      <a href="corporativo.html">Corporativo</a>
      <a href="https://psireal.com.br/" target="_blank" rel="noopener">PsiReal Cl\u00ednica</a>
      <a class="nav-cta" href="${whatsapp}" target="_blank" rel="noopener">Agendar</a>
    </div>
  `;

  const button = document.createElement('button');
  button.className = 'mobile-menu-toggle';
  button.type = 'button';
  button.setAttribute('aria-label', 'Abrir menu');
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('data-mobile-menu-open', '');
  button.innerHTML = '<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
  nav.appendChild(button);

  const menu = document.createElement('aside');
  menu.className = 'mobile-menu';
  menu.setAttribute('data-mobile-menu', '');
  menu.setAttribute('aria-label', 'Menu m\u00f3vel');
  menu.innerHTML = `
    <button class="mobile-menu-backdrop" type="button" aria-label="Fechar menu" data-mobile-menu-close></button>
    <div class="mobile-menu-panel">
      <div class="mobile-menu-head">
        <span class="mobile-menu-kicker">Menu</span>
        <button class="mobile-menu-close" type="button" aria-label="Fechar menu" data-mobile-menu-close>
          <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>
        </button>
      </div>
      <div class="mobile-menu-groups">
        <div class="mobile-menu-group">
          <strong>Atendimento</strong>
          <a href="terapia.html">Terapia <span>cl\u00ednica</span></a>
          <a href="ansiedade.html">Ansiedade <span>guia</span></a>
          <a href="index.html#processo">Processo <span>como funciona</span></a>
          <a href="index.html#sobre">Sobre <span>Michelle</span></a>
        </div>
        <div class="mobile-menu-group">
          <strong>Profissionais e empresas</strong>
          <a href="supervisao.html">Supervis\u00e3o <span>TCC</span></a>
          <a href="corporativo.html">Corporativo <span>empresas</span></a>
          <a href="https://psireal.com.br/" target="_blank" rel="noopener">PsiReal Cl\u00ednica <span>plataforma</span></a>
          <a href="https://psireal.com.br/biblioteca-tcc/index.html" target="_blank" rel="noopener">Biblioteca PsiReal <span>materiais</span></a>
        </div>
      </div>
      <a class="mobile-menu-cta" href="${whatsapp}" target="_blank" rel="noopener">Agendar conversa</a>
    </div>
  `;
  document.body.appendChild(menu);

  const openButton = document.querySelector('[data-mobile-menu-open]');
  const closeButtons = document.querySelectorAll('[data-mobile-menu-close]');

  const setOpen = (isOpen) => {
    menu.classList.toggle('is-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    openButton.setAttribute('aria-expanded', String(isOpen));
  };

  openButton.addEventListener('click', () => setOpen(true));
  closeButtons.forEach((closeButton) => closeButton.addEventListener('click', () => setOpen(false)));
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });

  const publicFormIds = new Set(['contactForm', 'ansiedadeLeadForm', 'cForm']);
  const getField = (ids) => {
    for (const id of ids) {
      const field = document.getElementById(id);
      if (field) return field.value.trim();
    }
    return '';
  };
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };
  const show = (id, display = 'block') => {
    const el = document.getElementById(id);
    if (el) el.style.display = display;
  };
  const hide = (id) => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  };

  document.addEventListener('submit', (event) => {
    const form = event.target.closest('form');
    if (!form || !publicFormIds.has(form.id)) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    const nome = getField(['nome', 'fNome', 'ansNome']);
    const servico = getField(['servico', 'fServ', 'ansServico']) || 'Conversa inicial';
    const mensagem = getField(['mensagem', 'fMsg', 'ansMsg']);
    const pagina = document.title ? `\nPagina: ${document.title}` : '';
    const text = encodeURIComponent(
      `Ola Michelle! Me chamo ${nome || 'nao informado'}.\n` +
      `Tenho interesse em: ${servico}.` +
      (mensagem ? `\n\nMensagem: ${mensagem}` : '') +
      pagina
    );

    hide('formError');
    hide('ansErr');
    const feedback = document.getElementById('fFeedback');
    if (feedback) {
      feedback.className = 'form-feedback ok';
      feedback.style.display = 'block';
      feedback.textContent = 'Abrindo WhatsApp para continuar a conversa.';
    }
    show('formSuccess');
    show('ansOk');
    setText('formBtnText', 'Abrindo WhatsApp...');
    setText('fBtn', 'Abrindo WhatsApp...');

    window.open(`https://wa.me/5511947388423?text=${text}`, '_blank', 'noopener');
    setTimeout(() => {
      form.reset();
      setText('formBtnText', 'Enviar mensagem');
      setText('fBtn', 'Enviar mensagem');
    }, 300);
  }, true);
})();
