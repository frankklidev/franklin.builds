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

      gsap.to(titleRef.current, {
        y: -2,
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

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

  useEffect(() => {
    const el = whatsappRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 2,
      defaults: { ease: "power2.out" },
    });

    tl.to(el, { scale: 1.04, duration: 0.22 })
      .to(el, { scale: 1, duration: 0.28 })
      .fromTo(
        el,
        { boxShadow: "0 0 0 0 rgba(198,166,107,0)" },
        {
          boxShadow: "0 0 28px 2px rgba(198,166,107,0.32)",
          duration: 0.25,
        },
        0
      )
      .to(
        el,
        { boxShadow: "0 0 0 0 rgba(198,166,107,0)", duration: 0.35 },
        "<+0.05"
      );

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
      className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 pt-10 text-center text-white"
    >
      <img
        ref={bgRef}
        src="/images/fondo_hero.jpg"
        alt="Fondo hero section"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />

      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,166,107,0.18),transparent_42%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-[#070707] to-transparent" />

      <div className="relative z-10 max-w-4xl">
        <div className="mb-5 inline-flex rounded-full border border-[#C6A66B]/30 bg-black/30 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C6A66B] backdrop-blur-md md:text-xs">
          Soluciones digitales para negocios
        </div>

        <h1
          ref={titleRef}
          className="font-righteous text-[2.45rem] font-normal leading-[1.05] tracking-tight text-white md:text-[4.6rem]"
        >
          Presencia digital premium para negocios que quieren vender mejor
        </h1>

        <p
          ref={subtitleRef}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-300 md:text-lg"
        >
          Desarrollo webs, catálogos digitales y sistemas a medida para que tu
          negocio se vea más profesional, genere confianza y convierta visitantes
          en clientes.
        </p>

        <div
          ref={ctasRef}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <NavLink
            ref={whatsappRef}
            to="https://wa.me/53552929141"
            target="_blank"
            rel="noreferrer"
            aria-label="Abrir chat de WhatsApp"
            onMouseEnter={() => pulseTl.current?.pause()}
            onMouseLeave={() => pulseTl.current?.resume()}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#C6A66B]/50 bg-[#C6A66B] px-6 py-3 text-sm font-semibold text-black shadow-[0_16px_40px_rgba(198,166,107,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#D9BB7A] will-change-transform"
          >
            <FaWhatsapp className="text-lg text-black" />
            Hablemos de tu negocio
          </NavLink>

          <NavLink
            to="/proyectos"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/6 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C6A66B]/50 hover:text-[#C6A66B]"
          >
            Ver casos reales
          </NavLink>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl gap-3 text-left sm:grid-cols-3">
          <div className="rounded-2xl border border-[#C6A66B]/15 bg-white/4 p-4 backdrop-blur-md">
            <p className="text-sm font-semibold text-white">Web profesional</p>
            <p className="mt-1 text-xs leading-5 text-neutral-400">
              Una imagen seria para que tus clientes confíen antes de escribirte.
            </p>
          </div>

          <div className="rounded-2xl border border-[#C6A66B]/15 bg-white/4 p-4 backdrop-blur-md">
            <p className="text-sm font-semibold text-white">Ventas por WhatsApp</p>
            <p className="mt-1 text-xs leading-5 text-neutral-400">
              Catálogos y flujos pensados para convertir consultas en pedidos.
            </p>
          </div>

          <div className="rounded-2xl border border-[#C6A66B]/15 bg-white/4 p-4 backdrop-blur-md">
            <p className="text-sm font-semibold text-white">Sistemas internos</p>
            <p className="mt-1 text-xs leading-5 text-neutral-400">
              Herramientas para organizar reservas, productos, clientes o procesos.
            </p>
          </div>
        </div>
      </div>

      <button
        ref={chevronRef}
        onClick={goToServices}
        aria-label="Ir a la sección de servicios"
        className="relative z-10 mt-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#C6A66B]/40 text-[#C6A66B] transition-colors hover:bg-[#C6A66B] hover:text-black"
      >
        <span className="text-lg leading-none">⌄</span>
      </button>
    </section>
  );
};

export default Hero;