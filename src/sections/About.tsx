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

    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, textRef.current], { opacity: 0, y: 24 });
      gsap.set(bulletsRef.current, { opacity: 0, y: 20 });

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
          });
        });
      } else {
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
      className="relative overflow-hidden border-t border-[#C6A66B]/15 bg-[#070707] py-20 text-white scroll-mt-24 md:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(198,166,107,0.16),transparent_42%)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-7">
          <div className="mb-5 w-fit rounded-full border border-[#C6A66B]/30 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C6A66B]">
            Sobre franklin.builds
          </div>

          <h2
            ref={titleRef}
            className="mb-5 font-alfa text-3xl font-semibold tracking-tight md:text-5xl"
          >
            Desarrollo soluciones digitales para negocios que quieren competir mejor
          </h2>

          <p
            ref={textRef}
            className="max-w-2xl text-base leading-relaxed text-neutral-400 md:text-lg"
          >
            Soy Franklin, fundador de{" "}
            <span className="font-semibold text-white">franklin.builds</span>.
            Ayudo a negocios locales y marcas en crecimiento a construir una
            presencia digital más seria, clara y preparada para vender.
          </p>

          <div ref={bulletsRef} className="mt-7 grid gap-4">
            {[
              "Diseño interfaces profesionales que generan confianza desde el primer contacto.",
              "Construyo webs, catálogos y sistemas pensados para convertir visitas en consultas.",
              "Integro herramientas prácticas como WhatsApp, analítica, SEO base y gestión de contenido.",
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#C6A66B]/30 bg-[#C6A66B]/10 text-[#C6A66B]">
                  <FiCheck aria-hidden />
                </span>
                <p className="text-neutral-300">{t}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid max-w-md grid-cols-3 gap-4">
            <div
              ref={setKpiRef(0)}
              data-target="12"
              className="rounded-2xl border border-[#C6A66B]/15 bg-white/[0.04] p-4 text-center"
            >
              <div className="text-2xl font-semibold text-white">
                <span data-num>0</span>+
              </div>
              <div className="mt-1 text-xs text-neutral-400">proyectos</div>
            </div>

            <div
              ref={setKpiRef(1)}
              data-target="90"
              className="rounded-2xl border border-[#C6A66B]/15 bg-white/[0.04] p-4 text-center"
            >
              <div className="text-2xl font-semibold text-white">
                <span data-num>0</span>+
              </div>
              <div className="mt-1 text-xs text-neutral-400">performance</div>
            </div>

            <div
              ref={setKpiRef(2)}
              data-target="3"
              className="rounded-2xl border border-[#C6A66B]/15 bg-white/[0.04] p-4 text-center"
            >
              <div className="text-2xl font-semibold text-white">
                <span data-num>0</span>d
              </div>
              <div className="mt-1 text-xs text-neutral-400">MVP inicial</div>
            </div>
          </div>

          <div className="mt-8">
            <NavLink
              to="https://wa.me/53552929141"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#C6A66B]/50 bg-[#C6A66B] px-6 py-3 text-sm font-semibold text-black shadow-[0_14px_35px_rgba(198,166,107,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#D9BB7A]"
            >
              <FaWhatsapp className="text-base" />
              Hablemos de tu negocio
            </NavLink>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="relative overflow-hidden rounded-3xl border border-[#C6A66B]/20 bg-white/[0.04] p-6 shadow-[0_24px_80px_rgba(198,166,107,0.10)] backdrop-blur-md">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(198,166,107,0.16),transparent_55%)]" />

            <div className="relative z-10">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#C6A66B]">
                Stack de desarrollo
              </p>

              <h3 className="text-2xl font-semibold text-white">
                Tecnología moderna para soluciones rápidas y escalables
              </h3>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#C6A66B]/20 bg-[#C6A66B]/10 px-3 py-1.5 text-sm text-[#C6A66B]">
                  <SiReact aria-hidden />
                  React
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-[#C6A66B]/20 bg-[#C6A66B]/10 px-3 py-1.5 text-sm text-[#C6A66B]">
                  <SiNextdotjs aria-hidden />
                  Next.js
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-[#C6A66B]/20 bg-[#C6A66B]/10 px-3 py-1.5 text-sm text-[#C6A66B]">
                  <SiTailwindcss aria-hidden />
                  Tailwind
                </span>
              </div>

              <p className="mt-6 text-sm leading-7 text-neutral-400">
                También trabajo con integraciones de WhatsApp, Supabase,
                analítica, optimización de imágenes, carga rápida y estructuras
                preparadas para crecer.
              </p>

              <div className="mt-6 rounded-2xl border border-[#C6A66B]/15 bg-black/30 p-4">
                <p className="text-sm font-semibold text-white">
                  Enfoque principal
                </p>
                <p className="mt-1 text-sm leading-6 text-neutral-400">
                  Claridad comercial, velocidad, confianza visual y conversión.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-[#C6A66B]/15 bg-white/3 p-4">
                  <p className="text-sm font-semibold text-white">
                    Para clientes
                  </p>
                  <p className="mt-1 text-xs leading-5 text-neutral-400">
                    Webs, catálogos, reservas y sistemas.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#C6A66B]/15 bg-white/3 p-4">
                  <p className="text-sm font-semibold text-white">
                    Para negocios
                  </p>
                  <p className="mt-1 text-xs leading-5 text-neutral-400">
                    Presencia seria, ventas y organización.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}