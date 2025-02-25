import { Project } from "@/state/api";
import Link from "next/link";
import React from "react";

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <Link href={`/projects/${project.id}`}>
      <div className="rounded border p-4 shadow dark:text-white">
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <p>Start Date: {project?.startDate?.substring(0, 10)}</p>
        <p>End Date: {project?.endDate?.substring(0, 10)}</p>
      </div>
    </Link>
  );
};

export default ProjectCard;
