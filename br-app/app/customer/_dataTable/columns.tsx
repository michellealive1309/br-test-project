"use client"

import { deleteCustomer } from "@/app/actions/deleteCustomer";
import { updateCustomer } from "@/app/actions/updateCustomer";
import { CustomerForm } from "@/app/components/ui/CustomerForm";
import { FormDialog } from "@/app/components/ui/FormDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Customer } from "@/types/customer";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const customer = row.original;
      const editFormId = "update_customer";
      const deleteFormId = "delete_customer";

      return (
        <div className="flex items-end gap-2">
          <FormDialog title="Edit order" triggerText="Edit" formId={editFormId} formAction={updateCustomer} confirmButtonText="Edit" triggerSize="sm" triggerVariant="secondary" >
            <CustomerForm formId={editFormId} customer={customer} />
          </FormDialog>
          <FormDialog title="Confirm delete order" triggerText="Delete" formId={deleteFormId} formAction={deleteCustomer} confirmButtonText="Delete" cancelButtonText="Cancel" triggerSize="sm" triggerVariant="destructive" >
            Confirm delete customer: {customer.name}
            <Input type="hidden" name="customer_id" form={deleteFormId} value={customer.id} />
          </FormDialog>
        </div>
      );
    }
  }
]