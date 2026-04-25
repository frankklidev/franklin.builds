import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaStar, FaQuoteLeft, FaWhatsapp } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import logoFulltech from "../../public/images/logoFulltech.jpeg";

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
      "Franklin entendió lo que necesitábamos: una presencia digital más clara, rápida y enfocada en generar confianza. El resultado se sintió mucho más profesional.",
    avatar: logoFulltech,
  },
  {
    name: "Rachel",
    role: "Dueña — LuxDrive",
    quote:
      "La web nos ayudó a presentar mejor el servicio, ordenar la información y facilitar que los clientes escribieran por WhatsApp. Se ve limpia, seria y premium.",
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
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (reduce) return;

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
        clearProps: "transform,opacity,willChange",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonios"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-[#C6A66B]/15 bg-[#070707] py-20 text-white md:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(198,166,107,0.16),transparent_40%)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <header className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <div className="mx-auto mb-5 w-fit rounded-full border border-[#C6A66B]/30 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C6A66B]">
            Testimonios
          </div>

          <h2 className="font-alfa text-3xl font-semibold tracking-tight md:text-5xl">
            Clientes que ya confiaron en una presencia digital más profesional
          </h2>

          <p className="mt-5 text-base leading-relaxed text-neutral-400 md:text-lg">
            Proyectos enfocados en claridad, confianza y conversión para negocios
            que quieren verse mejor y vender con más seguridad.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonios.map((t, i) => (
            <div
              key={t.name}
              ref={setCardRef(i)}
              className="group rounded-3xl border border-[#C6A66B]/15 bg-white/[0.04] p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#C6A66B]/40 hover:bg-white/[0.06] hover:shadow-[0_24px_80px_rgba(198,166,107,0.10)]"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                {t.avatar ? (
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-2xl border border-[#C6A66B]/20 bg-white/[0.06]">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-white">
                        {t.name}
                      </div>
                      <div className="text-xs text-neutral-400">{t.role}</div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {t.name}
                    </div>
                    <div className="text-xs text-neutral-400">{t.role}</div>
                  </div>
                )}

                <FaQuoteLeft
                  className="text-xl text-[#C6A66B]/60"
                  aria-hidden="true"
                />
              </div>

              <div
                className="mb-4 flex items-center gap-1 text-[#C6A66B]"
                aria-label="5 estrellas"
              >
                {[...Array(5)].map((_, k) => (
                  <FaStar key={k} className="text-sm" aria-hidden="true" />
                ))}
              </div>

              <p className="text-sm leading-7 text-neutral-300">{t.quote}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center md:mt-14">
          <NavLink
            to="https://wa.me/53552929141"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#C6A66B]/50 bg-[#C6A66B] px-6 py-3 text-sm font-semibold text-black shadow-[0_14px_35px_rgba(198,166,107,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#D9BB7A]"
          >
            <FaWhatsapp className="text-base" />
            Quiero mejorar mi presencia digital
          </NavLink>
        </div>
      </div>
    </section>
  );
}