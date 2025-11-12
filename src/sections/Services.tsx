import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const items = [
  { title: "Branding", desc: "Logotipos, paletas y sistemas visuales que proyectan confianza." },
  { title: "Web", desc: "Sitios rápidos, minimalistas y conectados a WhatsApp." },
  { title: "Estrategia", desc: "Contenido y enfoque para vender mejor en digital." },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<any>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);

      // Estado inicial (ocultas)
      gsap.set(cards, { y: 40, opacity: 0 });

      // Anima cada card cuando entra en viewport
      cards.forEach((el:any) => {
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

  // 🔑 Limpia el array de refs en cada render para evitar “fantasmas”
  cardsRef.current = [];

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="relative w-full h-full flex items-center justify-center text-white overflow-hidden"
    >
      <img
        src="/images/que_hacemos.png"
        alt="Fondo de servicios"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-10 font-alfa">
          Qué hago
        </h2>

        <div className="grid gap-8 md:gap-10 md:grid-cols-3">
          {items.map((it, i) => (
            <div
              key={it.title}
              ref={(el:any) => el && (cardsRef.current[i] = el)}
              className="bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
            >
              <h3 className="text-xl font-alfa mb-2">{it.title}</h3>
              <p className="text-white/80 leading-relaxed font-rammetto">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}