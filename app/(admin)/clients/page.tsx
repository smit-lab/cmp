import { DataTable } from "@/components/data-table";
import PageHeader from "@/components/page-header";
import AddClientDialog from "@/components/add-client-dialog";

import { fetchClientsData } from "@/lib/data";
import { ClientData } from "@/lib/definitions";

import { columns } from "./columns";

const ClientsPage = async () => {
  const data: ClientData[] = await fetchClientsData();
  return (
    <div className="p-4">
      <PageHeader pageTitle="Clients" pageDescription="Here is your clients" />
      <DataTable
        columns={columns}
        data={data}
        searchFilterBy="client"
        searchFilterPlaceholder="Filter emails..."
        pageType="clientsPage"
      >
        <AddClientDialog />
      </DataTable>
    </div>
  );
};

export default ClientsPage;
