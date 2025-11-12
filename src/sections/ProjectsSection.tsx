import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavLink } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  slug: string;
  name: string;
  summary: string;
  image?: string;
  tags?: string[];
  url?: string; // externo
};

const featuredProjects: Project[] = [
  {
    slug: "fulltech23",
    name: "Fulltech23",
    summary:
      "Sitio web moderno para una agencia tecnológica. Diseño limpio, profesional y responsivo, enfocado en generar confianza y captar clientes.",
    image: "/src/assets/images/logoFulltech.jpeg",
    tags: ["Next.js", "UI/UX", "SEO", "Performance"],
    url: "https://www.fulltech23.com/",
  },
  {
    slug: "luxdrive",
    name: "LuxDrive",
    summary:
      "Plataforma de renta de autos con dashboard admin, reservas online y un diseño premium.",
    // 👇 sin image → mostrará fallback con el nombre
    // image: undefined,
    tags: ["React", "Supabase", "Mantine", "Vite", "Performance"],
    url: "https://luxdrive.tuplataformaweb.com/",
  },
];

// Mapa simple de filtros -> tags relevantes
const FILTER_TAGS: Record<string, string[]> = {
  Todos: [],
  Branding: ["UI/UX", "Branding"],
  Web: ["React", "Next.js", "Vite", "Supabase", "Mantine"],
  Estrategia: ["SEO", "Performance"],
};

export default function ProjectsSection({
  limit,
  filter = "Todos",
}: {
  limit?: number;
  filter?: "Todos" | "Branding" | "Web" | "Estrategia";
}) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const projects = useMemo(() => {
    const base = featuredProjects.slice(0, limit ?? featuredProjects.length);
    if (filter === "Todos") return base;

    const needles = FILTER_TAGS[filter] ?? [];
    return base.filter((p) =>
      needles.length ? (p.tags ?? []).some((t) => needles.includes(t)) : true
    );
  }, [limit, filter]);

  // Animaciones de entrada + re-entrada al cambiar de filtro
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");

      gsap.set(cards, { y: 30, opacity: 0 });
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: "top 85%",
          once: true,
        },
      });

      // Parallax sutil tanto para imágenes como para fallbacks
      gsap.utils.toArray<HTMLElement>(".project-parallax").forEach((el) => {
        gsap.to(el, {
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [filter]);

  // Abrir externo manteniendo NavLink
  const openExternal = (url?: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {!projects.length ? (
        <div className="grid gap-8 md:grid-cols-2">
          <article className="project-card border border-neutral-200 rounded-2xl p-6 bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Sin proyectos para este filtro</h3>
            <p className="text-neutral-600 text-sm">
              Prueba con otro filtro o vuelve a “Todos”.
            </p>
          </article>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((p) => (
            <article
              key={p.slug}
              className="project-card group border border-neutral-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Media (imagen o fallback con nombre) */}
              <NavLink
                to={`/proyecto/${p.slug}`}
                onClick={openExternal(p.url)}
                className="block aspect-video overflow-hidden"
              >
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="project-parallax w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                ) : (
                  <div className="project-parallax relative w-full h-full transition-transform duration-700 group-hover:scale-[1.03]">
                    {/* fondo con degradado sutil + patrón grid muy suave */}
                    <div className="absolute inset-0 bg-linear-to-br from-[#f3f2ff] via-white to-[#e9e7ff]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-size-[100%_28px] opacity-[0.15]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-lg border border-neutral-300/70 bg-white/70 backdrop-blur text-neutral-800 text-sm md:text-base font-medium">
                        {p.name}
                      </span>
                    </div>
                  </div>
                )}
              </NavLink>

              {/* Texto */}
              <div className="p-6">
                <NavLink
                  to={`/proyecto/${p.slug}`}
                  onClick={openExternal(p.url)}
                  className="inline-block"
                >
                  <h3 className="text-xl font-semibold mb-2 hover:underline underline-offset-4">
                    {p.name}
                  </h3>
                </NavLink>

                <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                  {p.summary}
                </p>

                {p.tags?.length ? (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs border border-neutral-300 rounded-full px-2 py-0.5 text-neutral-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}

                <NavLink
                  to={`/proyecto/${p.slug}`}
                  onClick={openExternal(p.url)}
                  className="inline-block text-sm font-medium border border-black rounded-xl px-4 py-2 hover:bg-black hover:text-white transition-colors"
                >
                  Ver sitio
                </NavLink>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}