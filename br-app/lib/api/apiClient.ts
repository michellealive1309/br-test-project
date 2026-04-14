// import { ApiResponse } from "@/src/types/api_response";

import { ApiResponse } from "@/types/api-response";

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(status: number, data: any) {
    super("API Error");
    this.status = status;
    this.data = data;
  }
}

export class ApiClient {
  private baseUrl: string;
  private headers: Record<string, string> = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  addHeader(key: string, value: string) {
    this.headers[key] = value;
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(`${this.baseUrl}/${endpoint}`);
    if (params) {
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.headers,
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, body: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body),
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, body: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(body),
    });
    return this.handleResponse<T>(response);
  }

  async delete(endpoint: string): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: 'DELETE',
      headers: this.headers,
    });

    return [200, 204].includes(response.status);
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorText = await response.text() || 'Unknown Api error';
      throw new ApiError(response.status, errorText);
    }

    const responseData: ApiResponse<T> = await response.json();

    if (!responseData.success) {
      throw new ApiError(response.status, responseData.message);
    }

    return responseData.data;
  }
}