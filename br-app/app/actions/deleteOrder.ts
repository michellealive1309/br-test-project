"use server";
import { redirect } from "next/navigation";
import { deleteOrder as deleteOrderAPI } from "@/lib/api/orderAPI";

export type DeleteOrderState = {
  success: boolean;
  message: string;
  error?: string[];
}

export async function deleteOrder(state: DeleteOrderState, formData: FormData): Promise<DeleteOrderState> {
  const id = formData.get('order_id') as string;
  try {
    const response = await deleteOrderAPI(+id);

    if (!response) {
      return {
        success: false,
        message: 'Failed to delete order.',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while deleting the order.',
      error: [error instanceof Error ? error.message : 'An unknown error occurred.'],
    };
  }

  redirect('/order', 'replace');
}