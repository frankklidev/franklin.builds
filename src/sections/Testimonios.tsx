// src/sections/Testimonios.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaStar, FaQuoteLeft, FaWhatsapp } from "react-icons/fa";
import { NavLink } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

type Testimonio = {
  name: string;
  role: string;
  quote: string;
  avatar?: string;
};

const testimonios: Testimonio[] = [
  {
    name: "Victor",
    role: "Fundador — Fulltech23",
    quote:
      "Franklin mejoró la claridad del mensaje y la velocidad del sitio. Pasamos de ‘bonito’ a ‘convierte’. Ya nos escriben directo por WhatsApp.",
    avatar: "/src/assets/images/logoFulltech.jpeg",
  },
  {
    name: "Rachel",
    role: "Dueña — LuxDrive",
    quote:
      "La web con WhatsApp nos ordenó el catálogo y las consultas. Más simple, más ventas. Nos encantó lo limpio y profesional.",
    // sin avatar → no se muestra foto
  },
];

export default function Testimonios() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  cardsRef.current = [];

  const setCardRef = (i: number) => (el: HTMLDivElement | null): void => {
    if (el) cardsRef.current[i] = el;
  };

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduce) return;

      // Estado inicial sólido y sin “velo”
      gsap.set(cardsRef.current, {
        y: 24,
        opacity: 0,
        willChange: "transform, opacity",
      });

      gsap.to(cardsRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: "top 78%",
          once: true,
        },
        // Limpia estilos inline al terminar (cada elemento)
        clearProps: "transform,opacity,willChange",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonios"
      ref={sectionRef}
      className="relative py-16 md:py-24 border-t border-neutral-200/60 bg-white"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <header className="mb-10 md:mb-14 text-center">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight font-alfa">
            Lo que dicen mis clientes
          </h2>
          <p className="text-neutral-600 mt-3 md:mt-4">
            Resultados reales con foco en ventas y claridad de marca.
          </p>
        </header>

        {/* Cards de testimonios (sin logos/badges arriba) */}
        <div className="grid gap-6 md:grid-cols-2">
          {testimonios.map((t, i) => (
            <div
              key={t.name}
              ref={setCardRef(i)}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              {/* Header del testimonio: si hay avatar, lo mostramos; si no, solo texto */}
              {t.avatar ? (
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-neutral-200 overflow-hidden">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-xs text-neutral-600">{t.role}</div>
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-neutral-600">{t.role}</div>
                </div>
              )}

              <div
                className="flex items-center gap-1 text-amber-500 mb-3"
                aria-label="5 estrellas"
              >
                {[...Array(5)].map((_, k) => (
                  <FaStar key={k} className="text-sm" aria-hidden="true" />
                ))}
              </div>

              <p className="text-neutral-700 leading-relaxed relative">
                <FaQuoteLeft className="inline-block mr-2 text-neutral-400" aria-hidden="true" />
                {t.quote}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-14 text-center">
          <NavLink
            to="https://wa.me/53552929141"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[#25D366] px-5 py-2.5 text-sm font-medium text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
          >
            <FaWhatsapp className="text-base" />
            Hablemos por WhatsApp
          </NavLink>
        </div>
      </div>
    </section>
  );
}