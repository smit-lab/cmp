import AddProjectDialog from "@/components/add-projects-dialog";
import { DataTable } from "@/components/data-table";
import PageHeader from "@/components/page-header";
import { fetchClientData } from "@/lib/data";
import { fetchClientWithProjects } from "@/lib/definitions";

import { columns } from "./columns";
async function getData(_id: string) {
  try {
    const data: fetchClientWithProjects | null = await fetchClientData(_id);

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

const ClientIdPage = async ({ params }: { params: { clientId: string } }) => {
  const client_id = params.clientId;
  const fetchedData = await getData(client_id);
  const projects = fetchedData.projects;

  return (
    <div className="p-4">
      <PageHeader pageTitle="Client" pageDescription={client_id} />
      <DataTable
        data={projects}
        columns={columns}
        searchFilterBy="status"
        searchFilterPlaceholder="Filter by email..."
        pageType="projectsPage"
        isSearchableFilter={false}
      >
        <AddProjectDialog />
      </DataTable>
    </div>
  );
};

export default ClientIdPage;
