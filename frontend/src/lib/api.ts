import type { Product, User, CreateOrderPayload, CreateOrderResponse } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

// API client class for making HTTP requests to the backend
// This centralizes all API communication and handles errors consistently
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    // Store the base URL for the API
    this.baseUrl = baseUrl;
  }

  // Generic request method that handles all API calls
  // This method makes the actual HTTP request and handles the response
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    // Build the full URL by combining base URL and endpoint
    const url = `${this.baseUrl}${endpoint}`;

    try {
      // Make the HTTP request using the Fetch API
      const response = await fetch(url, {
        ...options, // Spread any additional options (method, body, etc.)
        headers: {
          'Content-Type': 'application/json', // Always send JSON
          ...options.headers, // Allow additional headers to be passed
        },
      });

      // Parse the response body as JSON
      const responseData = await response.json();

      // Check if the response was successful (status 200-299)
      if (!response.ok) {
        // If not successful, extract the error message from the response
        const errorData = responseData.error as ApiError;
        throw new Error(errorData?.message || 'An error occurred');
      }

      // Return the parsed data with the expected type
      return responseData as T;
    } catch (error) {
      // If it's already an Error instance, just rethrow it
      if (error instanceof Error) {
        throw error;
      }
      // Otherwise, wrap it in a generic error
      throw new Error('Network error occurred');
    }
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return this.request<Product[]>('/products');
  }

  async getProduct(id: string): Promise<Product> {
    return this.request<Product>(`/products/${id}`);
  }

  // Auth
  async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    agreeToPrivacy: boolean;
  }): Promise<User> {
    return this.request<User>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: { email: string; password: string }): Promise<User> {
    return this.request<User>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async forgotPassword(data: { email: string }): Promise<{ ok: boolean }> {
    return this.request<{ ok: boolean }>('/auth/forgot', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Orders
  async createOrder(data: CreateOrderPayload): Promise<CreateOrderResponse> {
    return this.request<CreateOrderResponse>('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const api = new ApiClient(API_BASE_URL);

