"use server";
import { Order } from "@/types/order";
import { updateOrder as updateOrderApi } from "@/lib/api/orderAPI";
import { redirect } from "next/navigation";

export type UpdateOrderState = {
  success: boolean;
  message: string;
  error?: string[];
  fields?: {
    order_id: number,
    order_customer_id: number,
    order_order_no: number,
    order_product_name: string,
    order_quantity: number,
    order_price: number,
    order_total_amount: number,
    order_status: 'pending' | 'paid' | 'cancelled'
  };
}

export async function updateOrder(state: UpdateOrderState, formData: FormData): Promise<UpdateOrderState> {
  const order = {
    id: Number(formData.get('order_id')),
    customer_id: Number(formData.get('order_customer_id')),
    order_no: Number(formData.get('order_order_no')),
    product_name: formData.get('order_product_name') as string,
    quantity: Number(formData.get('order_quantity')),
    price: Number(formData.get('order_price')),
    total_amount: Number(formData.get('order_total_amount')),
    status: formData.get('order_status') as string
  } as unknown as Order;

  try {
    const response = await updateOrderApi(order.id, order);

    if (!response) {
      return {
        success: false,
        message: 'Failed to update order.',
        fields: {
          order_id: order.id,
          order_customer_id: order.customer_id,
          order_order_no: order.order_no,
          order_product_name: order.product_name,
          order_quantity: order.quantity,
          order_price: +order.price,
          order_total_amount: +order.total_amount,
          order_status: order.status,
        },
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'An error occurred while updating the order.',
      error: [error instanceof Error ? error.message : 'An unknown error occurred.'],
      fields: {
        order_id: order.id,
        order_customer_id: order.customer_id,
        order_order_no: order.order_no,
        order_product_name: order.product_name,
        order_quantity: order.quantity,
        order_price: +order.price,
        order_total_amount: +order.total_amount,
        order_status: order.status,
      },
    };
  }

  redirect('/order', 'replace');
}