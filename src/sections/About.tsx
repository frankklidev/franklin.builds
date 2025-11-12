import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaWhatsapp } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import { SiReact, SiNextdotjs, SiTailwindcss } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const bulletsRef = useRef<HTMLDivElement | null>(null);
  const kpiRefs = useRef<HTMLDivElement[]>([]);
  kpiRefs.current = [];

  const setKpiRef = (i: number) => (el: HTMLDivElement | null): void => {
    if (el) kpiRefs.current[i] = el;
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Estado inicial consistente
      gsap.set([titleRef.current, textRef.current], { opacity: 0, y: 24 });
      gsap.set(bulletsRef.current, { opacity: 0, y: 20 });

      // Título
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });

      // Párrafo
      gsap.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });

      // Bullets
      gsap.to(bulletsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.15,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });

      // KPIs: contador animado
      if (!reduce) {
        kpiRefs.current.forEach((node) => {
          const target = Number(node.dataset.target || "0");
          const numEl = node.querySelector<HTMLElement>("[data-num]");
          if (!numEl) return;

          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: node,
              start: "top 85%",
              once: true,
            },
            onUpdate: () => {
              numEl.textContent = Math.floor(obj.val).toString();
            },
            onComplete: () => {
              // Si quieres un + al final en algunos KPIs, puedes dejarlo en el markup fijo.
            },
          });
        });
      } else {
        // Sin animación: setea valores finales
        kpiRefs.current.forEach((node) => {
          const target = node.dataset.target || "0";
          const numEl = node.querySelector<HTMLElement>("[data-num]");
          if (numEl) numEl.textContent = target;
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28 border-t border-neutral-200/60 bg-white"
    >
      {/* Blob/halo sutil de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-6 -translate-x-1/2 h-64 w-64 md:h-96 md:w-96 rounded-full bg-[#4f39f6]/10 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-12 gap-10 md:gap-12 items-center">
        {/* Columna texto */}
        <div className="md:col-span-7">
          <h2
            ref={titleRef}
            className="text-3xl md:text-5xl font-semibold tracking-tight font-alfa mb-5"
          >
            Sobre mí
          </h2>

          <p
            ref={textRef}
            className="text-neutral-700 text-base md:text-lg leading-relaxed max-w-2xl"
          >
            Soy Franklin, fundador de <span className="font-semibold">franklin.builds</span>. 
            Creo sitios y marcas minimalistas que **venden**: rápidos, claros y orientados a WhatsApp.
            Combino diseño, desarrollo y estrategia para que tu web pase de “bonita” a “que convierte”.
          </p>

          {/* Bullets diferenciales */}
          <div
            ref={bulletsRef}
            className="mt-6 grid gap-3"
          >
            {[
              "Performance real (90+ Lighthouse) y SEO base desde el día uno.",
              "Copy y estructura pensados para convertir, no solo para “verse bien”.",
              "Integraciones prácticas: WhatsApp, analítica y lo necesario para vender.",
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <FiCheck aria-hidden />
                </span>
                <p className="text-neutral-700">{t}</p>
              </div>
            ))}
          </div>

          {/* KPIs */}
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
            <div
              ref={setKpiRef(0)}
              data-target="12"
              className="text-center rounded-xl border border-neutral-200 bg-white p-4"
            >
              <div className="text-2xl font-semibold">
                <span data-num>0</span>+
              </div>
              <div className="text-xs text-neutral-600">proyectos</div>
            </div>
            <div
              ref={setKpiRef(1)}
              data-target="90"
              className="text-center rounded-xl border border-neutral-200 bg-white p-4"
            >
              <div className="text-2xl font-semibold">
                <span data-num>0</span>+
              </div>
              <div className="text-xs text-neutral-600">Lighthouse</div>
            </div>
            <div
              ref={setKpiRef(2)}
              data-target="3"
              className="text-center rounded-xl border border-neutral-200 bg-white p-4"
            >
              <div className="text-2xl font-semibold">
                <span data-num>0</span>d
              </div>
              <div className="text-xs text-neutral-600">MVP promedio</div>
            </div>
          </div>

          {/* CTA secundaria */}
          <div className="mt-7">
            <NavLink
              to="https://wa.me/53552929141"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[#25D366] px-5 py-2.5 text-sm font-medium text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
            >
              <FaWhatsapp className="text-base" />
              Cuéntame tu idea por WhatsApp
            </NavLink>
          </div>
        </div>

        {/* Columna “visual stack” / credentials */}
        <div className="md:col-span-5">
          <div className="rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur p-6 shadow-sm">
            <div className="mb-4 text-sm font-medium text-neutral-700">
              Stack con el que construyo
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5 text-sm">
                <SiReact className="text-sky-600" aria-hidden />
                React
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5 text-sm">
                <SiNextdotjs className="text-neutral-900" aria-hidden />
                Next.js
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5 text-sm">
                <SiTailwindcss className="text-cyan-500" aria-hidden />
                Tailwind
              </span>
            </div>

            <div className="mt-6 text-sm text-neutral-600 leading-relaxed">
              También trabajo con integraciones prácticas (WhatsApp,Supabase),
              y optimizaciones reales de rendimiento (imágenes, lazy-load, code-split).
            </div>

            {/* Nota de enfoque */}
            <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
              Enfoque: claridad, velocidad y conversión.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}