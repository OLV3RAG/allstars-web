const REDUCIR = window.matchMedia('(prefers-reduced-motion: reduce)');
const PUNTERO_FINO = window.matchMedia('(pointer: fine)');
const DURACION = 760;
const EASING = 'cubic-bezier(0.76, 0, 0.24, 1)';
const AUTOPLAY_MS = 6000;

type Anims = Animation[];

function movimientoReducido() {
  return REDUCIR.matches;
}

function paginaOculta() {
  return document.visibilityState === 'hidden';
}

function cancelar(anims: Anims) {
  anims.splice(0).forEach((anim) => anim.cancel());
}

export function iniciarHeroSlider(raiz: HTMLElement) {
  const copias = [...raiz.querySelectorAll<HTMLElement>('[data-hero-copy]')];
  const figuras = [...raiz.querySelectorAll<HTMLElement>('[data-hero-figure]')];
  const total = copias.length;
  const controles = raiz.querySelector<HTMLElement>('[data-hero-controls]');
  const puntos = [...raiz.querySelectorAll<HTMLButtonElement>('[data-hero-dot]')];
  const pausaBtn = raiz.querySelector<HTMLButtonElement>('[data-hero-pause]');
  const estado = raiz.querySelector<HTMLElement>('[data-hero-status]');
  const wipe = raiz.querySelector<HTMLElement>('[data-hero-wipe]');

  let indice = 0;
  let pausaUsuario = false;
  let enfocado = false;
  let timer: number | null = null;
  let enVista = true;
  const activas: Anims = [];

  function aplicarEstado(i: number) {
    copias.forEach((nodo, idx) => {
      const activo = idx === i;
      nodo.classList.toggle('is-active', activo);
      nodo.hidden = !activo && raiz.hasAttribute('data-ready');
      nodo.setAttribute('aria-hidden', activo ? 'false' : 'true');
      if ('inert' in nodo) {
        (nodo as HTMLElement & { inert: boolean }).inert = !activo && raiz.hasAttribute('data-ready');
      }
      nodo.querySelectorAll<HTMLElement>('a, button, input').forEach((el) => {
        if (activo) el.removeAttribute('tabindex');
        else el.tabIndex = -1;
      });
    });
    figuras.forEach((nodo, idx) => {
      const activo = idx === i;
      nodo.classList.toggle('is-active', activo);
      nodo.hidden = !activo && raiz.hasAttribute('data-ready');
      nodo.setAttribute('aria-hidden', activo ? 'false' : 'true');
    });
    puntos.forEach((dot, idx) => {
      dot.setAttribute('aria-current', idx === i ? 'true' : 'false');
    });
    if (estado) {
      estado.textContent = `Diapositiva ${i + 1} de ${total}`;
    }
  }

  function animarEntradaInicial() {
    if (movimientoReducido()) return;
    const bloques = [...raiz.querySelectorAll<HTMLElement>('[data-hero-block], [data-hero-word]')];
    const retraso = 55;
    bloques.forEach((bloque, i) => {
      activas.push(
        bloque.animate(
          [
            { opacity: 0, transform: 'translate3d(0, 22px, 0)' },
            { opacity: 1, transform: 'translate3d(0, 0, 0)' },
          ],
          { duration: 520, delay: 70 + i * retraso, easing: EASING, fill: 'both' },
        ),
      );
    });
    const figura = figuras[0];
    if (figura) {
      activas.push(
        figura.animate(
          [
            { opacity: 0, transform: 'translate3d(28px, 10px, 0) scale(0.94)' },
            { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' },
          ],
          { duration: 720, delay: 160, easing: EASING, fill: 'both' },
        ),
      );
    }
  }

  function animarNombre(copia: HTMLElement) {
    if (movimientoReducido()) return;
    copia.querySelectorAll<HTMLElement>('[data-hero-blur]').forEach((palabra, i) => {
      activas.push(
        palabra.animate(
          [
            { opacity: 0, filter: 'blur(8px)', transform: 'translate3d(0, 10px, 0)' },
            { opacity: 1, filter: 'blur(0px)', transform: 'translate3d(0, 0, 0)' },
          ],
          { duration: 420, delay: 80 + i * 40, easing: EASING, fill: 'both' },
        ),
      );
    });
  }

  function animarNumero(figura: HTMLElement, direccion: 1 | -1) {
    const numero = figura.querySelector<HTMLElement>('.hero-numero');
    if (!numero || movimientoReducido()) return;
    activas.push(
      numero.animate(
        [
          { opacity: 0, transform: `translate3d(${40 * direccion}px, 0, 0)` },
          { opacity: 0.35, transform: 'translate3d(0, 0, 0)' },
        ],
        { duration: 520, delay: 80, easing: EASING, fill: 'both' },
      ),
    );
  }

  function transicion(hacia: number, direccion: 1 | -1) {
    if (hacia === indice) return;
    cancelar(activas);
    const desde = indice;
    indice = (hacia + total) % total;
    aplicarEstado(indice);

    if (movimientoReducido()) return;

    const copiaOut = copias[desde];
    const copiaIn = copias[indice];
    const figOut = figuras[desde];
    const figIn = figuras[indice];
    const x = 48 * direccion;

    copiaOut.hidden = false;
    figOut.hidden = false;
    copiaIn.hidden = false;
    figIn.hidden = false;

    activas.push(
      copiaOut.animate(
        [
          { opacity: 1, transform: 'translate3d(0, 0, 0)' },
          { opacity: 0, transform: `translate3d(${-x}px, 16px, 0)` },
        ],
        { duration: DURACION, easing: EASING, fill: 'forwards' },
      ),
    );
    activas.push(
      figOut.animate(
        [
          { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' },
          { opacity: 0, transform: `translate3d(${-x * 0.6}px, 0, 0) scale(0.96)` },
        ],
        { duration: DURACION, easing: EASING, fill: 'forwards' },
      ),
    );
    activas.push(
      copiaIn.animate(
        [
          { opacity: 0, transform: `translate3d(${x}px, 18px, 0)` },
          { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        ],
        { duration: DURACION, easing: EASING, fill: 'both' },
      ),
    );
    activas.push(
      figIn.animate(
        [
          { opacity: 0, transform: `translate3d(${x * 0.7}px, 8px, 0) scale(1.04)` },
          { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' },
        ],
        { duration: DURACION, easing: EASING, fill: 'both' },
      ),
    );

    animarNombre(copiaIn);
    animarNumero(figIn, direccion);

    if (wipe) {
      wipe.hidden = false;
      activas.push(
        wipe.animate(
          [
            { transform: `translate3d(${direccion > 0 ? '-120%' : '120%'}, 0, 0) rotate(-18deg)`, opacity: 0.85 },
            { transform: `translate3d(${direccion > 0 ? '120%' : '-120%'}, 0, 0) rotate(-18deg)`, opacity: 0.15 },
          ],
          { duration: DURACION, easing: EASING },
        ),
      );
    }

    const ultima = activas[activas.length - 1];
    ultima?.finished
      .then(() => {
        if (wipe) wipe.hidden = true;
        aplicarEstado(indice);
      })
      .catch(() => {});
  }

  function ir(hacia: number, direccion?: 1 | -1) {
    const dest = (hacia + total) % total;
    const dir = direccion ?? (dest > indice || (indice === total - 1 && dest === 0) ? 1 : -1);
    transicion(dest, dir);
    programarAutoplay();
  }

  function siguiente() {
    ir(indice + 1, 1);
  }

  function anterior() {
    ir(indice - 1, -1);
  }

  function actualizarBotonPausa() {
    pausaBtn?.setAttribute('aria-pressed', pausaUsuario ? 'true' : 'false');
    if (pausaBtn) {
      pausaBtn.textContent = pausaUsuario ? 'Reanudar' : 'Pausar';
    }
  }

  function programarAutoplay() {
    if (timer) window.clearInterval(timer);
    timer = null;
    if (pausaUsuario || movimientoReducido() || !enVista || paginaOculta() || enfocado || total < 2) {
      return;
    }
    timer = window.setInterval(siguiente, AUTOPLAY_MS);
  }

  function iniciarMagnet(boton: Element | null) {
    if (!(boton instanceof HTMLElement)) return;
    const interior = boton.querySelector<HTMLElement>('[data-magnet]');
    if (!interior || movimientoReducido() || !PUNTERO_FINO.matches) return;

    const tope = 5;
    boton.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;
      const caja = boton.getBoundingClientRect();
      const x = ((event.clientX - caja.left) / caja.width - 0.5) * 2 * tope;
      const y = ((event.clientY - caja.top) / caja.height - 0.5) * 2 * tope;
      interior.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
    boton.addEventListener('pointerleave', () => {
      interior.style.transform = 'translate3d(0, 0, 0)';
    });
  }

  function sincronizarVista() {
    raiz.toggleAttribute('data-en-vista', enVista);
    raiz.toggleAttribute('data-pagina-oculta', paginaOculta());
    programarAutoplay();
  }

  raiz.setAttribute('data-ready', '');
  aplicarEstado(0);
  animarEntradaInicial();

  const visor = new IntersectionObserver(
    ([entry]) => {
      enVista = entry.isIntersecting;
      sincronizarVista();
    },
    { threshold: 0.35 },
  );
  visor.observe(raiz);
  document.addEventListener('visibilitychange', sincronizarVista);
  REDUCIR.addEventListener('change', () => {
    if (REDUCIR.matches) {
      pausaUsuario = true;
      actualizarBotonPausa();
      cancelar(activas);
    }
    sincronizarVista();
  });
  sincronizarVista();

  if (total < 2) {
    controles?.setAttribute('hidden', '');
    return;
  }

  controles?.removeAttribute('hidden');
  iniciarMagnet(raiz.querySelector('[data-hero-prev]'));
  iniciarMagnet(raiz.querySelector('[data-hero-next]'));

  raiz.querySelector('[data-hero-next]')?.addEventListener('click', siguiente);
  raiz.querySelector('[data-hero-prev]')?.addEventListener('click', anterior);
  pausaBtn?.addEventListener('click', () => {
    pausaUsuario = !pausaUsuario;
    actualizarBotonPausa();
    programarAutoplay();
  });
  puntos.forEach((dot, idx) => {
    dot.addEventListener('click', () => ir(idx));
  });

  raiz.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      siguiente();
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      anterior();
    }
  });

  raiz.addEventListener('focusin', () => {
    enfocado = true;
    programarAutoplay();
  });
  raiz.addEventListener('focusout', (event) => {
    const destino = event.relatedTarget;
    if (destino instanceof Node && raiz.contains(destino)) return;
    enfocado = false;
    programarAutoplay();
  });

  let startX = 0;
  let startY = 0;
  let swiping = false;
  raiz.addEventListener(
    'touchstart',
    (event) => {
      const toque = event.changedTouches[0];
      startX = toque.clientX;
      startY = toque.clientY;
      swiping = true;
    },
    { passive: true },
  );
  raiz.addEventListener(
    'touchend',
    (event) => {
      if (!swiping) return;
      swiping = false;
      const toque = event.changedTouches[0];
      const dx = toque.clientX - startX;
      const dy = toque.clientY - startY;
      if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
      if (dx < 0) siguiente();
      else anterior();
    },
    { passive: true },
  );

  actualizarBotonPausa();
  programarAutoplay();
}
