import { getCustomers } from "@/lib/api/customerAPI";
import { Metadata } from "next";
import DataTable from "../components/ui/DataTable";
import { columns } from "./_dataTable/columns";
import { FormDialog } from "../components/ui/FormDialog";
import { addCustomer } from "../actions/addCustomer";
import { CustomerForm } from "../components/ui/CustomerForm";

export const metadata: Metadata = {
  title: "Customer page",
  description: "Manage your customers here",
};

export default async function Customer() {
  const paginatedCustomers = await getCustomers(1, 1000);
  const formId = "customer_add";

  return (
    <div className="container mx-auto p-5">
      <div className="inline-block gap-2 py-2">
        <FormDialog title="Create customer" triggerText="Create customer" formId={formId} formAction={addCustomer} confirmButtonText="Create" cancelButtonText="Cancel" triggerSize="lg" >
          <CustomerForm formId={formId}></CustomerForm>
        </FormDialog>
      </div>
      <DataTable columns={columns} data={paginatedCustomers} />
    </div>
  );
}