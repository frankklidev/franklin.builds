import { NavLink } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#C6A66B]/15 bg-[#070707] text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <h2 className="font-alfa text-2xl tracking-tight">
              franklin<span className="text-[#C6A66B]">.builds</span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-neutral-400">
              Construyo webs, catálogos y sistemas digitales para negocios que
              quieren verse más profesionales, generar confianza y vender mejor.
            </p>

            <div className="mt-6 rounded-2xl border border-[#C6A66B]/20 bg-white/3 p-4">
              <p className="text-sm font-semibold text-[#C6A66B]">
                Webs · Sistemas · Presencia digital
              </p>
              <p className="mt-1 text-sm text-neutral-400">
                Soluciones claras para negocios reales.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C6A66B]">
              Navegación
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-neutral-400">
              <NavLink to="/" className="transition hover:text-white">
                Inicio
              </NavLink>
              <NavLink to="/#servicios" className="transition hover:text-white">
                Servicios
              </NavLink>
              <NavLink to="/proyectos" className="transition hover:text-white">
                Proyectos
              </NavLink>
              <NavLink to="/#about" className="transition hover:text-white">
                Sobre mí
              </NavLink>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C6A66B]">
              Contacto
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-neutral-400">
              <a
                href="https://wa.me/5352929141"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-white"
              >
                WhatsApp
              </a>

              

              <a
                href="https://www.instagram.com/franklin.builds"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-white"
              >
                Instagram
              </a>
            </div>

            <NavLink
              to="/#contacto"
              className="mt-6 inline-flex rounded-full border border-[#C6A66B]/50 bg-[#C6A66B] px-5 py-3 text-sm font-semibold text-black shadow-[0_14px_35px_rgba(198,166,107,0.18)] transition hover:bg-[#D9BB7A]"
            >
              Hablemos de tu negocio
            </NavLink>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[#C6A66B]/10 pt-6 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
          <p>© {year} franklin.builds. Todos los derechos reservados.</p>
          <p className="text-[#C6A66B]/80">
            Diseñado y desarrollado por Franklin.
          </p>
        </div>
      </div>
    </footer>
  );
}