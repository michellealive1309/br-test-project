import { cookies } from "next/headers";
import { ApiClient, ApiError } from "./apiClient";
import { Order } from "@/types/order";
import { PaginateApiResponse } from "@/types/paginate-api-response";

const orderBaseUrl = process.env.ORDER_API_BASE_URL || "http://localhost:3000";
const apiClient = new ApiClient(orderBaseUrl);

export async function getOrders(page?: number, limit?: number) {
  const token = (await cookies()).get('auth_token')?.value || '';
  apiClient.addHeader('Authorization', `Bearer ${token}`);
  try {
    const orders = await apiClient.get<PaginateApiResponse<Order[]>>('orders?page=' + page + '&limit=' + limit);
    return orders;
  } catch (error) {
      console.log('Fetch orders error:', (error instanceof ApiError ? error.data : "Unknown error"));
      return null;
  }
}

export async function getOrderById(id: number) {
  const token = (await cookies()).get('auth_token')?.value || '';
  apiClient.addHeader('Authorization', `Bearer ${token}`);
  try {
      const order = await apiClient.get<Order>(`orders/${id}`);
      return order;
  } catch (error) {
      console.log('Fetch order error:', (error instanceof ApiError ? error.data : "Unknown error"));
      return null;
  }
}

export async function createOrder(orderData: any) {
  const token = (await cookies()).get('auth_token')?.value || '';
  apiClient.addHeader('Authorization', `Bearer ${token}`);
  try {
      const order = await apiClient.post<Order>('orders', orderData);
      return order;
  } catch (error) {
      console.log('Create order error:', (error instanceof ApiError ? error.data : "Unknown error"));
      return null;
  }
}

export async function updateOrder(id: number, orderData: Order) {
  const token = (await cookies()).get('auth_token')?.value || '';
  apiClient.addHeader('Authorization', `Bearer ${token}`);
  try {
      const order = await apiClient.put<Order>(`orders/${id}`, orderData);
      return order;
  } catch (error) {
      console.log('Update order error:', (error instanceof ApiError ? error.data : "Unknown error"));
      return null;
  }
}

export async function deleteOrder(id: number) {
  const token = (await cookies()).get('auth_token')?.value || '';
  apiClient.addHeader('Authorization', `Bearer ${token}`);
  try {
      const result = await apiClient.delete(`orders/${id}`);
      return result;
  } catch (error) {
      console.log('Delete order error:', (error instanceof ApiError ? error.data : "Unknown error"));
      return null;
  }
}