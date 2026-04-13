"use client";
import { deleteOrder } from "@/app/actions/deleteOrder";
import { updateOrder } from "@/app/actions/updateOrder";
import { FormDialog } from "@/app/components/ui/FormDialog";
import { OrderForm } from "@/app/components/ui/OrderForm";
import { Input } from "@/components/ui/input";
import { Order } from "@/types/order";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "customer_id",
    header: "Customer",
    cell: ({ row, table }) => {
      const order = row.original;
      const customersList = (table.options.meta as any)?.customers as { id: number, name: string }[];
      const name = customersList.find((customer) => customer.id === order.customer_id)?.name || '';

      return name;
    }
  },
  {
    accessorKey: "order_no",
    header: "Order Number",
  },
  {
    accessorKey: "product_name",
    header: "Product Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "total_amount",
    header: "Total Amount",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<string>("status");
      let colorClass = "";
      switch (status) {
        case "pending":
          colorClass = "bg-yellow-100 text-yellow-800";
          break;
        case "paid":
          colorClass = "bg-green-100 text-green-800";
          break;
        case "cancelled":
          colorClass = "bg-red-100 text-red-800";
          break;
        default:
          colorClass = "bg-gray-100 text-gray-800";
      }
      return (
        <span className={`px-2 py-1 rounded text-center ${colorClass}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const order = row.original;
      const customersList = (table.options.meta as any)?.customers;
      const editFormId = "update_order";
      const deleteFormId = "delete_order";

      return (
        <div className="flex items-end gap-2">
          <FormDialog title="Edit order" triggerText="Edit" formId={editFormId} formAction={updateOrder} confirmButtonText="Edit" triggerSize="sm" triggerVariant="secondary" >
            <OrderForm formId={editFormId} order={order} customersList={customersList} />
          </FormDialog>
          <FormDialog title="Confirm delete order" triggerText="Delete" formId={deleteFormId} formAction={deleteOrder} confirmButtonText="Delete" cancelButtonText="Cancel" triggerSize="sm" triggerVariant="destructive" >
            Confirm delete order no. {order.order_no}
            <Input type="hidden" name="order_id" form={deleteFormId} value={order.id} />
          </FormDialog>
        </div>
      );
    }
  }
]