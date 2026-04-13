import { getOrders } from "@/lib/api/orderAPI";
import { Metadata } from "next";
import { columns } from "./_dataTable/columns";
import DataTable from "../components/ui/DataTable";
import { getCustomersList } from "@/lib/api/customerAPI";
import { FormDialog } from "../components/ui/FormDialog";
import { addOrder } from "../actions/addOrder";
import { OrderForm } from "../components/ui/OrderForm";

export const metadata: Metadata = {
  title: "Order page",
  description: "Manage your orders here",
};

export default async function Order() {
  const paginatedOrders = await getOrders(1, 1000);
  const customersList = await getCustomersList() ?? [];
  const formId = "order_add";

  return (
    <div className="container mx-auto p-5">
      <div className="inline-block gap-2 py-2">
        <FormDialog title="Create order" triggerText="Create order" formId={formId} formAction={addOrder} confirmButtonText="Create" cancelButtonText="Cancel" triggerSize="lg" >
          <OrderForm formId={formId} customersList={customersList}></OrderForm>
        </FormDialog>
      </div>
      <DataTable columns={columns} data={paginatedOrders?.data} meta={{ customers: customersList }} />
    </div>
  );
}