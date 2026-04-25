import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll<HTMLElement>(".cta-item");

      gsap.set(items, { opacity: 0, y: 22 });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          once: true,
        },
      });

      if (!reduce) {
        gsap.fromTo(
          ".cta-pulse",
          { scale: 0.98 },
          {
            scale: 1,
            duration: 1.8,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const goToServicios = () => {
    const scrollTo = () => {
      const el = document.getElementById("servicios");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    if (location.pathname !== "/") {
      navigate("/#servicios");
      requestAnimationFrame(() => setTimeout(scrollTo, 50));
    } else {
      scrollTo();
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-[#C6A66B]/15 bg-[#070707] py-24 text-white md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,166,107,0.18),transparent_42%)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <div className="cta-item mb-5 inline-flex items-center gap-2 rounded-full border border-[#C6A66B]/30 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C6A66B]">
          <MdVerified className="text-[15px]" aria-hidden />
          Solución digital lista para vender
        </div>

        <h2 className="cta-item mx-auto max-w-3xl font-alfa text-3xl font-semibold tracking-tight md:text-5xl">
          Convierte tu presencia digital en una herramienta real de ventas
        </h2>

        <p className="cta-item mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-400 md:text-lg">
          Hablemos de tu negocio, detectemos qué está frenando tus ventas online
          y construyamos una solución clara: web, catálogo, reservas, WhatsApp o
          sistema interno.
        </p>

        <div className="cta-item mx-auto mt-10 max-w-3xl rounded-3xl border border-[#C6A66B]/20 bg-white/[0.04] p-6 shadow-[0_24px_80px_rgba(198,166,107,0.10)] backdrop-blur-md md:p-8">
          <p className="mx-auto mb-6 max-w-xl text-sm leading-7 text-neutral-300 md:text-base">
            No necesitas “solo una página bonita”. Necesitas una presencia
            digital que genere confianza, explique bien tu oferta y facilite que
            el cliente te escriba.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <NavLink
              to="https://wa.me/53552929141"
              target="_blank"
              rel="noreferrer"
              className="cta-pulse inline-flex items-center justify-center gap-2 rounded-full border border-[#C6A66B]/50 bg-[#C6A66B] px-6 py-3 text-sm font-semibold text-black shadow-[0_14px_35px_rgba(198,166,107,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#D9BB7A]"
            >
              <FaWhatsapp className="text-lg" />
              Hablemos de tu negocio
            </NavLink>

            <button
              onClick={goToServicios}
              className="inline-flex items-center justify-center rounded-full border border-[#C6A66B]/25 bg-white/[0.05] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C6A66B]/50 hover:text-[#C6A66B]"
            >
              Ver servicios
            </button>
          </div>

          <div className="mt-5 text-xs text-neutral-500">
            Ideal para restaurantes, tiendas, servicios, renta de autos y marcas
            que quieren verse más profesionales.
          </div>
        </div>
      </div>
    </section>
  );
}