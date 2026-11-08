import ProjectCard from "@/components/project-card";
import { PROJECTS } from "@/data/projects";

export default function LabPage() {
  return (
    <main className="min-h-svh px-4 pt-32 pb-24">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-10 gap-y-14">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </main>
  );
}
