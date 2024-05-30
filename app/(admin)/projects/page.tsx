import { DataTable } from "@/components/data-table";
import PageHeader from "@/components/page-header";
import AddProjectDialog from "@/components/add-projects-dialog";

import { fetchAllProjectsData } from "@/lib/data";
import { ProjectsData } from "@/lib/definitions";

import { columns } from "./columns";

const ProjectsPage = async () => {
  const data: ProjectsData[] = await fetchAllProjectsData();

  return (
    <div className="p-4">
      <PageHeader pageTitle="Projects" />
      <DataTable
        data={data}
        columns={columns}
        searchFilterBy="client"
        searchFilterPlaceholder="Filter by email..."
        pageType="projectsPage"
      >
        <AddProjectDialog />
      </DataTable>
    </div>
  );
};

export default ProjectsPage;
