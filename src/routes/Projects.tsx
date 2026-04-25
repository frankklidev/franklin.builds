import { useNavigate, useLocation } from "react-router-dom";
import ProjectsSection from "../sections/ProjectsSection";

export default function Projects() {
  const navigate = useNavigate();
  const location = useLocation();

  const showBackButton = location.pathname === "/proyectos";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070707] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(198,166,107,0.22),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#000_0%,#070707_38%,#0B0B0B_100%)]" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-[#C6A66B]/10 blur-3xl md:h-[520px] md:w-[520px]" />

      <section className="relative z-10 px-4 pt-28 md:pt-36">
        <div className="mx-auto max-w-6xl">
          {showBackButton && (
            <button
              onClick={() => navigate("/")}
              className="mb-10 inline-flex items-center gap-2 rounded-full border border-[#C6A66B]/20 bg-white/[0.04] px-4 py-2 text-sm font-medium text-neutral-300 backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C6A66B]/50 hover:text-[#C6A66B]"
            >
              <span className="text-[#C6A66B]">←</span>
              Volver al inicio
            </button>
          )}

          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-6 w-fit rounded-full border border-[#C6A66B]/30 bg-[#C6A66B]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C6A66B] shadow-[0_0_40px_rgba(198,166,107,0.10)]">
              Portafolio estratégico
            </div>

            <h1 className="font-alfa text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
              Proyectos digitales diseñados para verse mejor y vender con más confianza
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-neutral-400 md:text-lg">
              Casos reales donde combino diseño, desarrollo y estrategia para
              ayudar a negocios a presentar mejor su oferta, ordenar sus
              servicios y convertir más clientes.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-[#C6A66B]/15 bg-white/[0.04] p-5 text-center backdrop-blur-md">
              <p className="text-2xl font-semibold text-[#C6A66B]">01</p>
              <p className="mt-2 text-sm font-medium text-white">Imagen profesional</p>
              <p className="mt-1 text-xs leading-5 text-neutral-500">
                Interfaces limpias que generan confianza.
              </p>
            </div>

            <div className="rounded-3xl border border-[#C6A66B]/15 bg-white/[0.04] p-5 text-center backdrop-blur-md">
              <p className="text-2xl font-semibold text-[#C6A66B]">02</p>
              <p className="mt-2 text-sm font-medium text-white">Enfoque comercial</p>
              <p className="mt-1 text-xs leading-5 text-neutral-500">
                Estructura pensada para convertir.
              </p>
            </div>

            <div className="rounded-3xl border border-[#C6A66B]/15 bg-white/[0.04] p-5 text-center backdrop-blur-md">
              <p className="text-2xl font-semibold text-[#C6A66B]">03</p>
              <p className="mt-2 text-sm font-medium text-white">Solución funcional</p>
              <p className="mt-1 text-xs leading-5 text-neutral-500">
                Webs, catálogos y sistemas reales.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-14 md:pb-32 md:pt-20">
        <div className="mb-8 flex flex-col gap-3 border-t border-[#C6A66B]/10 pt-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C6A66B]">
              Casos destacados
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
              Soluciones construidas para negocios reales
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-neutral-500">
            Cada proyecto busca una mezcla clara: estética premium, velocidad,
            confianza y facilidad para que el cliente tome acción.
          </p>
        </div>

        <ProjectsSection />
      </section>
    </main>
  );
}