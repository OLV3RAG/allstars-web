const REDUCIR = window.matchMedia('(prefers-reduced-motion: reduce)');

export function iniciarRevelados(raiz: ParentNode = document) {
  if (REDUCIR.matches) return;

  const nodos = [...raiz.querySelectorAll<HTMLElement>('[data-revelar]')];
  if (!nodos.length) return;

  const visor = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        const nodo = entrada.target as HTMLElement;
        visor.unobserve(nodo);
        const delay = Number(nodo.dataset.revelarDelay ?? 0);
        window.setTimeout(() => nodo.classList.add('revelado'), delay);
      }
    },
    { threshold: 0.16, rootMargin: '0px 0px -10% 0px' },
  );

  nodos.forEach((nodo) => visor.observe(nodo));
}
