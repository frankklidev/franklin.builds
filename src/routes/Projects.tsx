import ProjectsSection from "../sections/ProjectsSection";


export default function Projects() {
  return (
    <main className="min-h-screen pt-24 md:pt-28 bg-linear-to-b from-white via-neutral-50 to-neutral-100">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-semibold font-alfa tracking-tight mb-10 text-center">
          Proyectos destacados
        </h1>

        {/* ✅ Reutilizas tu componente animado con GSAP */}
        <ProjectsSection />
      </div>
    </main>
  );
}