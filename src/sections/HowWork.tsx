
import { useEffect, useRef, type JSX } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaFigma, FaReact, FaWhatsapp, FaGoogle } from "react-icons/fa";
import { MdSpeed, MdChecklistRtl, MdRocketLaunch } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

type Step = {
  k: string;
  title: string;
  desc: string;
  icon: JSX.Element;
  extended?: {
    check: string[];
    timeline: { t: string; v: string }[];
    badges: { icon: JSX.Element; text: string }[];
  };
};

const steps: Step[] = [
  {
    k: "brief",
    title: "1) Diagnóstico & Brief",
    desc: "Entiendo tu negocio, objetivos y prioridades. Definimos alcance, métricas y quick wins.",
    icon: <MdChecklistRtl className="text-xl" aria-hidden="true" />,
  },
  {
    k: "propuesta",
    title: "2) Propuesta & Roadmap",
    desc: "Mapa de páginas, estructura, estilo visual, plan de contenidos y cronograma por hitos.",
    icon: <FaFigma className="text-xl" aria-hidden="true" />,
  },
  {
    k: "build",
    title: "3) Diseño + Construcción",
    desc: "UI premium, copy que convierte y desarrollo web rápido, seguro y listo para WhatsApp.",
    icon: <FaReact className="text-xl" aria-hidden="true" />,
    extended: {
      check: [
        "Wireframes de alta fidelidad y sistema de diseño (UI kit)",
        "Tipografías, color y componentes consistentes (branding)",
        "Copy de alto impacto con CTA hacia WhatsApp",
        "Desarrollo responsive (mobile-first) con performance",
        "SEO técnico inicial (metas, OG, sitemaps, semántica)",
        "Optimización de velocidad (imágenes, lazy-load, code-split)",
        "Integración WhatsApp y analítica (GA4 / Meta Pixel)",
        "QA funcional + accesibilidad básica",
      ],
      timeline: [
        { t: "Día 1–2", v: "Wireframes + UI kit" },
        { t: "Día 3–5", v: "Diseño final + copy" },
        { t: "Día 6–8", v: "Desarrollo + integraciones" },
        { t: "Día 9", v: "QA + ajustes" },
      ],
      badges: [
        { icon: <MdSpeed aria-hidden="true" />, text: "90+ Lighthouse" },
        { icon: <FaWhatsapp aria-hidden="true" />, text: "WhatsApp Ready" },
        { icon: <FaGoogle aria-hidden="true" />, text: "SEO Base" },
      ],
    },
  },
  {
    k: "launch",
    title: "4) Lanzamiento & Medición",
    desc: "Publicación, checklist final y plan de optimización con métricas accionables.",
    icon: <MdRocketLaunch className="text-xl" aria-hidden="true" />,
  },
];

export default function ComoTrabajo() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // setter seguro para refs (no retorna nada, evita error TS)
  const setCardRef = (i: number) => (el: HTMLDivElement | null): void => {
    if (el) cardsRef.current[i] = el;
  };

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        autoAlpha: 0, // maneja opacity + visibility
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="proceso"
      ref={sectionRef}
      className="relative py-16 md:py-24 border-t border-neutral-200/60 bg-white scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-10 md:mb-14 text-center">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight font-alfa">
            Cómo trabajo
          </h2>
          <p className="text-neutral-600 mt-3 md:mt-4">
            Un proceso claro, rápido y enfocado en resultados.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {/* Paso 1 */}
          <div
            ref={setCardRef(0)}
            className="rounded-2xl border border-neutral-200 bg-white p-6"
          >
            <div className="mb-3 text-neutral-800 flex items-center gap-2">
              {steps[0].icon}
              <h3 className="text-lg font-semibold">{steps[0].title}</h3>
            </div>
            <p className="text-neutral-600 leading-relaxed">{steps[0].desc}</p>
          </div>

          {/* Paso 2 */}
          <div
            ref={setCardRef(1)}
            className="rounded-2xl border border-neutral-200 bg-white p-6"
          >
            <div className="mb-3 text-neutral-800 flex items-center gap-2">
              {steps[1].icon}
              <h3 className="text-lg font-semibold">{steps[1].title}</h3>
            </div>
            <p className="text-neutral-600 leading-relaxed">{steps[1].desc}</p>
          </div>

          {/* Paso 3 - DESTACADO */}
          <article
            ref={setCardRef(2)}
            aria-labelledby="step-3-title"
            className="relative overflow-hidden rounded-2xl border border-black/90 bg-black text-white p-6 md:col-span-1 md:row-span-2"
          >
            {/* halo premium */}
            <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(60%_40%_at_50%_0%,rgba(79,57,246,0.35),transparent_65%)]" />
            <div className="mb-3 relative z-10 flex items-center gap-2">
              {steps[2].icon}
              <h3 id="step-3-title" className="text-lg font-semibold">
                {steps[2].title}
              </h3>
            </div>

            <p className="relative z-10 text-white/90 leading-relaxed mb-5">
              {steps[2].desc}
            </p>

            {/* Badges */}
            <div className="relative z-10 flex flex-wrap gap-2 mb-5">
              {steps[2].extended?.badges.map((b, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs"
                >
                  <span className="&>*:translate-y-1px">{b.icon}</span>
                  {b.text}
                </span>
              ))}
            </div>

            {/* Checklist (lista real) */}
            <ul className="relative z-10 space-y-2 mb-6">
              {steps[2].extended?.check.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"
                  />
                  <p className="text-sm leading-relaxed text-white/95">{c}</p>
                </li>
              ))}
            </ul>

            {/* Timeline simple (lista real) */}
            <div className="relative z-10 rounded-xl border border-white/15 bg-white/5 p-4">
              <div className="text-sm font-medium mb-3">Timeline estimado</div>
              <ol className="space-y-2">
                {steps[2].extended?.timeline.map((it, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-1 h-1.5 w-1.5 rounded-full bg-white/70"
                    />
                    <div className="text-sm">
                      <div className="text-white/95">{it.t}</div>
                      <div className="text-white/70">{it.v}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </article>

          {/* Paso 4 */}
          <div
            ref={setCardRef(3)}
            className="rounded-2xl border border-neutral-200 bg-white p-6 md:col-span-2"
          >
            <div className="mb-3 text-neutral-800 flex items-center gap-2">
              {steps[3].icon}
              <h3 className="text-lg font-semibold">{steps[3].title}</h3>
            </div>
            <p className="text-neutral-600 leading-relaxed">{steps[3].desc}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs border border-neutral-300 rounded-full px-2 py-0.5">
                Checklist de lanzamiento
              </span>
              <span className="text-xs border border-neutral-300 rounded-full px-2 py-0.5">
                Métricas accionables
              </span>
              <span className="text-xs border border-neutral-300 rounded-full px-2 py-0.5">
                Plan de mejora continua
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}