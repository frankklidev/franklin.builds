// src/sections/CTA.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { MdBolt, MdSpeed, MdVerified } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

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
          { scale: 1, duration: 1.8, ease: "sine.inOut", repeat: -1, yoyo: true }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const goToServicios = () => {
    // asegura scroll suave incluso si estás en otra ruta
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
      className="
        relative overflow-hidden
        py-24 md:py-32
        border-t border-neutral-200/60
        bg-white
      "
    >
      {/* Fondo premium: gradiente + halo suave */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50 to-white" />
        <div className="absolute left-1/2 top-6 -translate-x-1/2 h-[28rem] w-[28rem] md:h-[36rem] md:w-[36rem] rounded-full bg-[#4f39f6]/10 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#25D366]/10 blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 text-center">
        {/* Eyebrow */}
        <div className="cta-item inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 backdrop-blur px-3 py-1 text-xs font-medium text-neutral-700 mb-4">
          <MdVerified className="text-[14px] text-emerald-600" aria-hidden />
          Lista para convertir desde el día uno
        </div>

        {/* Título */}
        <h2 className="cta-item text-3xl md:text-5xl font-semibold tracking-tight mb-4">
          ¿Listo para transformar tu marca en resultados?
        </h2>

        {/* Subtítulo */}
        <p className="cta-item text-neutral-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
          Diseño minimalista, desarrollo rápido y estrategia enfocada en ventas.
          Empezamos simple, medimos y escalamos.
        </p>

        {/* Badges de confianza */}
        

        {/* Card “glass” con CTAs */}
        <div
          className="
            cta-item relative mx-auto max-w-3xl
            rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur
            shadow-sm
            p-6 md:p-8
          "
        >
          <p className="text-neutral-700 mb-6">
            Cuéntame tu idea por WhatsApp o revisa proyectos para ver cómo trabajo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* CTA principal: WhatsApp */}
            <NavLink
              to="https://wa.me/53552929141"
              target="_blank"
              rel="noreferrer"
              className="
                cta-pulse inline-flex items-center justify-center gap-2
                rounded-xl border border-[#25D366]
                px-6 py-3 text-sm font-medium
                text-[#25D366]
                hover:bg-[#25D366] hover:text-white
                transition-colors
              "
            >
              <FaWhatsapp className="text-lg" />
              Hablemos por WhatsApp
            </NavLink>

            {/* CTA secundaria: ir a Servicios */}
            <button
              onClick={goToServicios}
              className="
                inline-flex items-center justify-center
                rounded-xl
                px-6 py-3 text-sm font-medium
                bg-black text-white
                hover:bg-neutral-900
                transition-colors
              "
            >
              Ver servicios
            </button>
          </div>

          {/* Nota pequeña */}
          <div className="mt-4 text-xs text-neutral-500">
            Tiempo de respuesta promedio: &lt; 1 hora (10am–7pm).
          </div>
        </div>
      </div>
    </section>
  );
}