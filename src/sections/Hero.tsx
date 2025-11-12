import { useEffect, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import gsap from "gsap";

const Hero = () => {
  const navigate = useNavigate();

  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLImageElement | null>(null);
  const chevronRef = useRef<HTMLButtonElement | null>(null);
  const whatsappRef = useRef<HTMLAnchorElement | null>(null);
  const pulseTl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1 },
      });

      // Animación inicial
      tl.fromTo(
        titleRef.current,
        { y: 60, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)" }
      )
        .fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0, filter: "blur(4px)" },
          { y: 0, opacity: 1, filter: "blur(0px)" },
          "-=0.5"
        )
        .fromTo(
          ctasRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1 },
          "-=0.4"
        );

      // Título con leve flotación
      gsap.to(titleRef.current, {
        y: -2,
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Parallax en fondo
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current!,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Chevron animado
      gsap.to(chevronRef.current, {
        y: 6,
        duration: 1.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Pulso sutil del botón de WhatsApp
  useEffect(() => {
    const el = whatsappRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2, defaults: { ease: "power2.out" } });
    tl.to(el, { scale: 1.04, duration: 0.22 })
      .to(el, { scale: 1, duration: 0.28 })
      .fromTo(
        el,
        { boxShadow: "0 0 0 0 rgba(37,211,102,0)" },
        { boxShadow: "0 0 24px 2px rgba(37,211,102,0.35)", duration: 0.25 },
        0
      )
      .to(el, { boxShadow: "0 0 0 0 rgba(37,211,102,0)", duration: 0.35 }, "<+0.05");

    pulseTl.current = tl;
    return () => {
      tl.kill();
      pulseTl.current = null;
    };
  }, []);

  function goToServices() {
    const el = document.getElementById("servicios");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else navigate("/#servicios");
  }

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex flex-col justify-center items-center text-center min-h-[92vh] pt-10 px-6 overflow-hidden text-white"
    >
      {/* Imagen de fondo */}
      <img
        ref={bgRef}
        src="/src/assets/images/fondo_hero.jpg"
        alt="Fondo hero section"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-black/35" />

      {/* Contenido */}
      <div className="relative z-10 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] max-w-3xl">
        <div className="text-xs md:text-sm uppercase tracking-[0.25em] mb-5 font-rammetto text-white">
          Diseño & Estrategia Digital
        </div>

        <h1
          ref={titleRef}
          className="font-righteous text-[2.4rem] md:text-[4.2rem] leading-[1.08] font-normal tracking-tight mb-4 text-white"
        >
          Diseño + Web + Estrategia que convierte en clientes
        </h1>

        <p
          ref={subtitleRef}
          className="font-rammetto max-w-2xl mx-auto text-white/95 text-base md:text-lg leading-relaxed mb-9"
        >
          Transformo negocios locales en marcas digitales que venden. Minimalismo, performance y una experiencia que inspira confianza
        </p>

        {/* CTAs */}
        <div ref={ctasRef} className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* WhatsApp con pulso */}
          <NavLink
            ref={whatsappRef}
            to="https://wa.me/53552929141"
            target="_blank"
            rel="noreferrer"
            aria-label="Abrir chat de WhatsApp"
            onMouseEnter={() => pulseTl.current?.pause()}
            onMouseLeave={() => pulseTl.current?.resume()}
            className="inline-flex items-center justify-center gap-2 border border-[#25D366] px-6 py-3 rounded-xl text-sm font-medium font-rammetto text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors will-change-transform"
          >
            <FaWhatsapp className="text-lg text-[#25D366]" />
            Hablemos por WhatsApp
          </NavLink>

          {/* Ver proyectos */}
          <NavLink
            to="/proyectos"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-medium font-rammetto bg-white/10 border border-white/30 hover:bg-white hover:text-black transition-colors"
          >
            Ver proyectos
          </NavLink>
        </div>
      </div>

      {/* Chevron scroll */}
      <button
        ref={chevronRef}
        onClick={goToServices}
        aria-label="Ir a la sección de servicios"
        className="relative z-10 mt-10 inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/50 hover:bg-white hover:text-black transition-colors"
      >
        <span className="text-lg leading-none">⌄</span>
      </button>
    </section>
  );
};

export default Hero;