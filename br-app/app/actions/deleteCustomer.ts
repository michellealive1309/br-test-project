"use server";

import { redirect } from "next/navigation";
import { deleteCustomer as deleteCustomerAPI } from "@/lib/api/customerAPI";

export type DeleteCustomerState = {
  success: boolean;
  message: string;
  error?: string[];
}

export async function deleteCustomer(state: DeleteCustomerState, formData: FormData): Promise<DeleteCustomerState> {
  const id = Number(formData.get('customer_id'));

  try {
    const response = await deleteCustomerAPI(id);
    if (!response) {
      return {
        success: false,
        message: "Failed to delete customer",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while deleting the customer",
      error: [error instanceof Error ? error.message : String(error)],
    };
  }

  redirect('/customer', 'replace');
}