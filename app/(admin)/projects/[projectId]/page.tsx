import PageHeader from "@/components/page-header";
import ProjectDetailCard from "@/components/project-detail-card";
import Timeline from "@/components/timeline";

import { fetchProjectData } from "@/lib/data";
import { fetchProjectWithClient } from "@/lib/definitions";

async function getData(id: string) {
  try {
    const data: fetchProjectWithClient | null = await fetchProjectData(id);

    if (!data) {
      console.error("Project not found");
      throw new Error("Project not found");
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch data", error);
    throw new Error("Failed to fetch data");
  }
}

const ProjectIdPage = async ({ params }: { params: { projectId: string } }) => {
  const project_id = params.projectId;

  const fetchedData = await getData(project_id);

  return (
    <div className="p-4">
      <PageHeader
        pageTitle="Project"
        pageDescription={`Name: ${fetchedData.name}`}
        className="mb-6"
      />
      <div className="grid grid-cols-3">
        <Timeline
          timelineData={fetchedData.project_steps}
          id={project_id}
          currentStatus={fetchedData.status}
        />
        <ProjectDetailCard project_id={project_id} data={fetchedData} />
      </div>
    </div>
  );
};

export default ProjectIdPage;
