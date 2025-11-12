import { useNavigate, useLocation } from "react-router-dom";
import ProjectsSection from "../sections/ProjectsSection";

export default function Projects() {
  const navigate = useNavigate();
  const location = useLocation();

  const showBackButton = location.pathname === "/proyectos";

  return (
    <main className="min-h-screen pt-24 md:pt-28 bg-linear-to-b from-white via-neutral-50 to-neutral-100">
      <div className="max-w-6xl mx-auto px-4">
        {/* Título */}
        <h1 className="text-3xl md:text-5xl font-semibold font-alfa tracking-tight mb-10 text-center">
          Proyectos destacados
        </h1>

        {/* Botón de atrás: solo visible en /proyectos */}
        {showBackButton && (
          <div className="text-center mb-10">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 border border-neutral-300 rounded-xl px-5 py-2.5 text-sm font-medium text-neutral-700 hover:border-neutral-500 hover:bg-neutral-100 transition-colors"
            >
              ← Volver al inicio
            </button>
          </div>
        )}

        {/* Sección de proyectos */}
        <ProjectsSection />
      </div>
    </main>
  );
}