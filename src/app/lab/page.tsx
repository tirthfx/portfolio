import ProjectCard from "@/components/project-card";
import { PROJECTS } from "@/data/projects";

export default function LabPage() {
  return (
    <main className="min-h-svh px-4 pt-32 pb-24">
      <div className="mx-auto grid max-w-6xl gap-x-8 gap-y-14 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </main>
  );
}
