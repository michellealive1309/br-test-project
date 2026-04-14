import "server-only";
import { cookies } from "next/headers";
import { ApiClient, ApiError } from "./apiClient";
import { Customer } from "@/types/customer";
import { User } from "@/types/user";
import { PaginateApiResponse } from "@/types/paginate-api-response";

const customerApiBaseUrl = process.env.CUSTOMER_API_BASE_URL || 'http://localhost:8000/api';
const apiClient = new ApiClient(customerApiBaseUrl);

export async function login(email: string, password: string): Promise<string> {
  try {
    const token = await apiClient.post<{ token: string }>('auth/login', { email, password });
    return token.token;
  } catch (error) {
    console.log('Login error:', (error instanceof ApiError ? error.data : "Unknown error"));
    return '';
  }
}

export async function logout() {
  const token = (await cookies()).get('auth_token')?.value || '';
  apiClient.addHeader('Authorization', `Bearer ${token}`);
  try {
    await apiClient.post<{ message: string }>('auth/logout', {});
    return true;
  } catch (error) {
    console.log('Logout error:', (error instanceof ApiError ? error.data : "Unknown error"));
    return false;
  }
}

export async function me() {
  const token = (await cookies()).get('auth_token')?.value || '';
  apiClient.addHeader('Authorization', `Bearer ${token}`);
  try {
    const user = await apiClient.get<User>('auth/me');
    return user;
  } catch (error) {
    console.log('Fetch user error:', (error instanceof ApiError ? error.data : "Unknown error"));
    return null;
  }
}

export async function register(email: string, password: string) {
  try {
    const token = await apiClient.post<{ token: string }>('auth/register', { email, password });
    return token.token;
  } catch (error) {
    return '';
  }
}

export async function getCustomers(page: number = 1, limit: number = 10) {
  const token = (await cookies()).get('auth_token')?.value || '';
  apiClient.addHeader('Authorization', `Bearer ${token}`);

  try {
    const customers = await apiClient.get<Customer[]>('customers?page=' + page + '&limit=' + limit);
    return customers;
  } catch (error) {
    console.log('Fetch customers error:', (error instanceof ApiError ? error.data : "Unknown error"));
    return null;
  }
}

export async function getCustomersList() {
  const token = (await cookies()).get('auth_token')?.value || '';
  apiClient.addHeader('Authorization', `Bearer ${token}`);

  try {
    const customersList = await apiClient.get<{ id: number, name: string }[]>('customers/list');
    return customersList;
  } catch (error) {
    console.log('Fetch customers error:', (error instanceof ApiError ? error.data : "Unknown error"));
    return null;
  }
}

export async function getCustomerById(id: number) {
  const token = (await cookies()).get('auth_token')?.value || '';
  apiClient.addHeader('Authorization', `Bearer ${token}`);
  try {
    const customer = await apiClient.get<Customer>(`customers/${id}`);
    return customer;
  } catch (error) {
    console.log('Fetch customer error:', (error instanceof ApiError ? error.data : "Unknown error"));
    return null;
  }
}

export async function createCustomer(customerData: Customer) {
  const token = (await cookies()).get('auth_token')?.value || '';
  apiClient.addHeader('Authorization', `Bearer ${token}`);
  try {
    const customer = await apiClient.post<Customer>('customers', customerData);
    return customer;
  } catch (error) {
    console.log('Create customer error:', (error instanceof ApiError ? error.data : "Unknown error"));
    return null;
  }
}

export async function updateCustomer(id: number, customerData: Customer) {
  const token = (await cookies()).get('auth_token')?.value || '';
  apiClient.addHeader('Authorization', `Bearer ${token}`);
  try {
    const customer = await apiClient.put<Customer>(`customers/${id}`, customerData);
    return customer;
  } catch (error) {
    console.log('Update customer error:', (error instanceof ApiError ? error.data : "Unknown error"));
    return null;
  }
}

export async function deleteCustomer(id: number) {
  const token = (await cookies()).get('auth_token')?.value || '';
  apiClient.addHeader('Authorization', `Bearer ${token}`);
  try {
    const result = await apiClient.delete(`customers/${id}`);
    return result;
  } catch (error) {
    console.log('Delete customer error:', (error instanceof ApiError ? error.data : "Unknown error"));
    return null;
  }
}