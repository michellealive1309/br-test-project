"use server";
import { Customer } from "@/types/customer";
import { updateCustomer as updateCustomerAPI } from "@/lib/api/customerAPI";
import { redirect } from "next/navigation";

export type UpdateCustomerState = {
  success: boolean;
  message: string;
  error?: string[];
  fields?: {
    customer_id: number,
    customer_name: string,
    customer_email: string,
    customer_phone: string,
  }
}

export async function updateCustomer(state: UpdateCustomerState, formData: FormData): Promise<UpdateCustomerState> {
  const customer = {
    id: Number(formData.get('customer_id')),
    name: formData.get('customer_name') as string,
    email: formData.get('customer_email') as string,
    phone: formData.get('customer_phone') as string,
  } as unknown as Customer;

  try {
    const response = await updateCustomerAPI(customer.id, customer);

    if (!response) {
      return {
        success: false,
        message: 'Failed to update customer.',
        fields: {
          customer_id: customer.id,
          customer_name: customer.name,
          customer_email: customer.email,
          customer_phone: customer.phone,
        }
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while updating the customer.',
      error: [error instanceof Error ? error.message : 'An unknown error occurred.'],
      fields: {
        customer_id: customer.id,
        customer_name: customer.name,
        customer_email: customer.email,
        customer_phone: customer.phone,
      }
    };
  }

  redirect('/customer', 'replace');
}