import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    title: "Presencia digital premium",
    desc: "Tu negocio no solo necesita verse bonito: necesita transmitir confianza desde el primer clic.",
  },
  {
    title: "Webs que convierten",
    desc: "Páginas rápidas, claras y conectadas a WhatsApp para convertir visitantes en clientes reales.",
  },
  {
    title: "Catálogos y sistemas",
    desc: "Soluciones digitales para mostrar productos, recibir pedidos, gestionar reservas y organizar procesos.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);

      gsap.set(cards, { y: 40, opacity: 0 });

      cards.forEach((el) => {
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  cardsRef.current = [];

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#070707] py-24 text-white"
    >
      <img
        src="/images/que_hacemos.png"
        alt="Fondo de servicios"
        className="absolute inset-0 h-full w-full object-cover opacity-35"
      />

      <div className="absolute inset-0 bg-black/75" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,166,107,0.18),transparent_42%)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[#070707] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#070707] to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center">
        <div className="mx-auto mb-5 inline-flex rounded-full border border-[#C6A66B]/30 bg-white/4 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C6A66B]">
          Servicios digitales
        </div>

        <h2 className="font-alfa text-3xl font-semibold tracking-tight md:text-5xl">
          Soluciones para que tu negocio venda mejor
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-400 md:text-lg">
          Creo herramientas digitales que ayudan a negocios locales a verse más
          profesionales, recibir más consultas y convertir mejor cada oportunidad.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <div
              key={it.title}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="group rounded-3xl border border-[#C6A66B]/15 bg-white/4 p-6 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#C6A66B]/45 hover:bg-white/[0.07] hover:shadow-[0_20px_60px_rgba(198,166,107,0.12)] md:p-8"
            >
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#C6A66B]/30 bg-[#C6A66B]/10 text-sm font-bold text-[#C6A66B]">
                0{i + 1}
              </div>

              <h3 className="font-alfa text-xl text-white">{it.title}</h3>

              <p className="mt-4 text-sm leading-7 text-neutral-400">
                {it.desc}
              </p>

              <div className="mt-6 h-px w-full bg-linear-to-r from-[#C6A66B]/40 to-transparent" />

              <p className="mt-5 text-sm font-semibold text-[#C6A66B]">
                Pensado para atraer, convencer y vender.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}