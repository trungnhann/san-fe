const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:80/api/v1';

type FetchOptions = RequestInit & {
  headers?: Record<string, string>;
  _retry?: boolean;
};

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  error?: {
    code: string;
    message: string;
  };
  meta?: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { headers, ...rest } = options;
    const url = `${this.baseUrl}${endpoint}`;

    // Add Authorization header if token exists
    let token = null;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    const authHeaders: Record<string, string> = {};
    if (token) {
      authHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...rest,
      headers: {
        // Only set Content-Type to json if body is not FormData
        ...(rest.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        ...authHeaders,
        ...headers,
      },
    };

    let response;
    try {
      response = await fetch(url, config);
    } catch (error) {
      console.error('API Request Error:', error);
      throw new Error('Network error. Please check your connection or try again later.');
    }

    // Handle 401 Unauthorized (Token expired)
    if (typeof window !== 'undefined' && response.status === 401 && !endpoint.includes('/auth/login') && !endpoint.includes('/auth/refresh') && !options._retry) {
       try {
         const refreshToken = localStorage.getItem('refresh_token');
         if (refreshToken) {
           // Call refresh token endpoint directly using fetch to avoid circular dependency loop
           // if we tried to use apiClient.post here (though apiClient is a class instance so it might be fine, 
           // but cleaner to use fetch directly or a separate method).
           // Actually, let's just make a fetch call.
           const refreshResponse = await fetch(`${this.baseUrl}/auth/refresh`, {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ refresh_token: refreshToken }),
           });

           if (refreshResponse.ok) {
             const json = await refreshResponse.json();
             // Assuming structure { success: true, data: { access_token: "...", refresh_token: "..." } }
             const newData = json.data;
             
             if (newData && newData.access_token) {
               localStorage.setItem('token', newData.access_token);
               if (newData.refresh_token) {
                 localStorage.setItem('refresh_token', newData.refresh_token);
               }
               
               // Retry original request with new token
               const newHeaders = {
                 ...config.headers,
                 'Authorization': `Bearer ${newData.access_token}`,
               };
               
               console.log('Retrying request with new token:', newData.access_token.substring(0, 10) + '...');
               console.log('Headers:', JSON.stringify(newHeaders));
               
               return this.request<T>(endpoint, { ...options, headers: newHeaders as Record<string, string>, _retry: true });
             }
           }
         }
         
         // If refresh failed or no refresh token, logout (clear storage)
         localStorage.removeItem('token');
         localStorage.removeItem('refresh_token');
         localStorage.removeItem('user');
         window.location.href = '/login';
         throw new Error('Session expired. Please login again.');
         
       } catch (e) {
         // If anything goes wrong during refresh, redirect to login
         localStorage.removeItem('token');
         localStorage.removeItem('refresh_token');
         localStorage.removeItem('user');
         window.location.href = '/login';
         throw new Error('Session expired. Please login again.');
       }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      // Handle standard error response structure
      if (errorData.error) {
        throw new Error(errorData.error.message || `API Error: ${response.statusText}`);
      }
      throw new Error(errorData.message || `API Error: ${response.statusText}`);
    }

    if (response.status === 204) {
      return {} as T;
    }

    const json = await response.json();
    
    // If the response is wrapped in an envelope (has success and data fields), return the data
    // But we might want the full response sometimes. For now, let's keep it simple:
    // If we type T as ApiResponse<Something>, we expect the full object.
    // If we type T as Something, we might expect unwrapped data.
    // However, to be consistent with the backend structure, let's assume T represents the "Data" part 
    // and we unwrap it here if it matches the envelope structure.
    
    if (json && typeof json === 'object' && 'success' in json && 'data' in json) {
       if (!json.success) {
           throw new Error(json.error?.message || 'API request failed');
       }
       return json.data as T;
    }

    return json as T;
  }

  get<T>(endpoint: string, options?: FetchOptions) {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T>(endpoint: string, body: any, options?: FetchOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  put<T>(endpoint: string, body: any, options?: FetchOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  delete<T>(endpoint: string, options?: FetchOptions) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(API_URL);
