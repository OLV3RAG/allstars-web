const REDUCIR = window.matchMedia('(prefers-reduced-motion: reduce)');
const EASING = 'cubic-bezier(0.76, 0, 0.24, 1)';

function reducido() {
  return REDUCIR.matches;
}

function paginaOculta() {
  return document.visibilityState === 'hidden';
}

export function iniciarRoster(raiz: HTMLElement) {
  const paneles = [...raiz.querySelectorAll<HTMLElement>('[data-roster-panel]')];
  const tabs = [...raiz.querySelectorAll<HTMLButtonElement>('[data-roster-tab]')];
  const eyecatch = raiz.querySelector<HTMLElement>('[data-eyecatch]');
  const marca = eyecatch?.querySelector<HTMLElement>('[data-eyecatch-brand]');
  const lamelas = eyecatch ? [...eyecatch.querySelectorAll<HTMLElement>('[data-eyecatch-panel]')] : [];
  const visto = new Set<string>();
  const activas: Animation[] = [];
  const flotaciones: Animation[] = [];
  const esperas: number[] = [];
  let destello: number | null = null;
  let cardsActivas: HTMLElement[] = [];
  let enVista = false;
  let indiceDestello = 0;

  if (tabs.length) {
    raiz.querySelectorAll('[data-roster-fallback-link]').forEach((nodo) => nodo.remove());
  }

  function tarjetas(panel: HTMLElement) {
    return [...panel.querySelectorAll<HTMLElement>('[data-roster-card]')];
  }

  function limpiarEsperas() {
    esperas.splice(0).forEach((id) => window.clearTimeout(id));
  }

  function cancelarActivas() {
    activas.splice(0).forEach((anim) => anim.cancel());
  }

  function detenerReposo() {
    if (destello) window.clearInterval(destello);
    destello = null;
    flotaciones.splice(0).forEach((anim) => anim.cancel());
    cardsActivas.forEach((card) => card.classList.remove('is-gleam'));
  }

  function programar(fn: () => void, ms: number) {
    const id = window.setTimeout(fn, ms);
    esperas.push(id);
    return id;
  }

  function mostrarPanel(id: string, animar: boolean) {
    cancelarActivas();
    limpiarEsperas();
    detenerReposo();

    paneles.forEach((panel) => {
      const activo = panel.dataset.rosterPanel === id;
      panel.hidden = !activo;
      panel.setAttribute('aria-hidden', activo ? 'false' : 'true');
    });
    tabs.forEach((tab) => {
      const activo = tab.dataset.rosterTab === id;
      tab.setAttribute('aria-selected', activo ? 'true' : 'false');
      tab.tabIndex = activo ? 0 : -1;
    });

    const panel = paneles.find((nodo) => nodo.dataset.rosterPanel === id);
    if (!panel) return;
    const cards = tarjetas(panel);
    cardsActivas = cards;

    if (animar && !reducido()) {
      reproducirEntrada(id, cards);
    } else if (!reducido()) {
      iniciarReposo(cards);
    }
  }

  function reproducirEntrada(id: string, cards: HTMLElement[]) {
    const presupuesto = 1800;
    const eyecatchMs = Math.min(900, Math.floor(presupuesto * 0.5));
    const resto = presupuesto - eyecatchMs;
    const stagger = cards.length ? Math.min(80, Math.floor(resto / Math.max(cards.length, 1))) : 0;

    if (eyecatch) {
      eyecatch.hidden = false;
      eyecatch.classList.add('is-on');
      marca?.setAttribute('data-categoria', id);
      const label = marca?.querySelector('[data-eyecatch-label]');
      if (label) label.textContent = `Categoría ${id}`;

      lamelas.forEach((panelEl, i) => {
        const fromTop = i % 2 === 0;
        activas.push(
          panelEl.animate(
            [
              { transform: `translate3d(0, ${fromTop ? '-100%' : '100%'}, 0)` },
              { transform: 'translate3d(0, 0, 0)' },
            ],
            { duration: 400, delay: i * 55, easing: EASING, fill: 'forwards' },
          ),
        );
      });
      if (marca) {
        activas.push(
          marca.animate(
            [
              { opacity: 0, transform: 'scale(0.86)' },
              { opacity: 1, transform: 'scale(1)' },
            ],
            { duration: 320, delay: 240, easing: EASING, fill: 'both' },
          ),
        );
      }
    }

    programar(() => {
      if (eyecatch) {
        lamelas.forEach((panelEl, i) => {
          const fromTop = i % 2 === 0;
          activas.push(
            panelEl.animate(
              [
                { transform: 'translate3d(0, 0, 0)' },
                { transform: `translate3d(0, ${fromTop ? '-100%' : '100%'}, 0)` },
              ],
              { duration: 340, delay: i * 36, easing: EASING, fill: 'forwards' },
            ),
          );
        });
        programar(() => {
          eyecatch.hidden = true;
          eyecatch.classList.remove('is-on');
        }, 480);
      }

      cards.forEach((card, i) => {
        const entrada = card.querySelector<HTMLElement>('[data-card-entrada]') ?? card;
        const numero = card.querySelector<HTMLElement>('[data-card-numero]');
        const franja = card.querySelector<HTMLElement>('[data-card-franja]');
        activas.push(
          entrada.animate(
            [
              { opacity: 0, transform: 'translate3d(-24px, 0, 0)' },
              { opacity: 1, transform: 'translate3d(0, 0, 0)' },
            ],
            { duration: 400, delay: i * stagger, easing: EASING, fill: 'both' },
          ),
        );
        if (numero) {
          activas.push(
            numero.animate(
              [
                { opacity: 0, transform: 'translate3d(36px, 0, 0)' },
                { opacity: 0.35, transform: 'translate3d(0, 0, 0)' },
              ],
              { duration: 440, delay: i * stagger + 30, easing: EASING, fill: 'both' },
            ),
          );
        }
        if (franja) {
          activas.push(
            franja.animate(
              [
                { opacity: 0, transform: 'translate3d(-16px, 0, 0)' },
                { opacity: 1, transform: 'translate3d(0, 0, 0)' },
              ],
              { duration: 380, delay: i * stagger + 70, easing: EASING, fill: 'both' },
            ),
          );
        }
      });

      programar(() => iniciarReposo(cards), resto);
    }, eyecatchMs);
  }

  function puedeReposo() {
    return !reducido() && enVista && !paginaOculta();
  }

  function iniciarReposo(cards: HTMLElement[]) {
    detenerReposo();
    cardsActivas = cards;
    if (!puedeReposo() || !cards.length) return;

    cards.forEach((card) => {
      const figura = card.querySelector<HTMLElement>('[data-card-figura]');
      if (!figura) return;
      const anim = figura.animate(
        [
          { transform: 'translate3d(0, 0, 0)' },
          { transform: 'translate3d(0, -3px, 0)' },
          { transform: 'translate3d(0, 0, 0)' },
        ],
        { duration: 3600, iterations: Infinity, easing: 'ease-in-out' },
      );
      flotaciones.push(anim);
    });

    indiceDestello = 0;
    const marcar = () => {
      if (!puedeReposo()) return;
      const hover = cards.find((card) => card.matches(':hover, :focus-visible, :focus-within'));
      cards.forEach((card) => card.classList.remove('is-gleam'));
      if (hover) {
        hover.classList.add('is-gleam');
        return;
      }
      cards[indiceDestello % cards.length]?.classList.add('is-gleam');
      indiceDestello += 1;
    };
    marcar();
    destello = window.setInterval(marcar, 4000);
  }

  function sincronizarReposo() {
    if (puedeReposo()) {
      if (!flotaciones.length && cardsActivas.length) iniciarReposo(cardsActivas);
      flotaciones.forEach((anim) => anim.play());
    } else {
      flotaciones.forEach((anim) => anim.pause());
      if (destello) {
        window.clearInterval(destello);
        destello = null;
      }
      cardsActivas.forEach((card) => card.classList.remove('is-gleam'));
    }
  }

  function categoriaInicial() {
    return tabs[0]?.dataset.rosterTab || paneles[0]?.dataset.rosterPanel || '2012';
  }

  const arranque = categoriaInicial();
  raiz.setAttribute('data-roster-ready', '');
  if (tabs.length) {
    mostrarPanel(arranque, false);
  } else {
    cardsActivas = paneles[0] ? tarjetas(paneles[0]) : [];
  }

  raiz.querySelectorAll<HTMLElement>('[data-roster-card]').forEach((card) => {
    const destellar = () => {
      if (reducido()) return;
      cardsActivas.forEach((otra) => otra.classList.remove('is-gleam'));
      card.classList.add('is-gleam');
    };
    card.addEventListener('pointerenter', destellar);
    card.addEventListener('focus', destellar);
  });

  const io = new IntersectionObserver(
    ([entry]) => {
      enVista = entry.isIntersecting;
      const actual = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true')?.dataset.rosterTab || arranque;
      if (enVista && !visto.has(actual)) {
        visto.add(actual);
        mostrarPanel(actual, true);
      } else {
        sincronizarReposo();
      }
    },
    { threshold: 0.28 },
  );
  io.observe(raiz);

  document.addEventListener('visibilitychange', sincronizarReposo);
  REDUCIR.addEventListener('change', () => {
    if (REDUCIR.matches) {
      cancelarActivas();
      limpiarEsperas();
      detenerReposo();
    } else {
      sincronizarReposo();
    }
  });

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      const id = tab.dataset.rosterTab;
      if (!id) return;
      visto.add(id);
      mostrarPanel(id, true);
    });
    tab.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      const next = event.key === 'ArrowRight' ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length;
      tabs[next].focus();
      tabs[next].click();
    });
  });
}
