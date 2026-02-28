import { apiClient } from "@/lib/api-client";
import { User } from "./auth.service";

export interface UpdateUserRequest {
  username?: string;
  email?: string;
  bio?: string;
}

export const userService = {
  getUser: (id: string) => {
    return apiClient.get<User>(`/users/${id}`);
  },

  updateUser: (id: string, data: UpdateUserRequest) => {
    return apiClient.put<User>(`/users/${id}`, data);
  },

  uploadAvatar: (id: string, file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);

    // We need to bypass the default JSON content-type header for FormData
    // The browser will automatically set the correct Content-Type with boundary
    return apiClient.request<User>(`/users/${id}/avatar`, {
      method: 'POST',
      body: formData as any, // Type assertion because Fetch body can be FormData but our wrapper might be strict
      headers: {
        // Explicitly undefined to let browser set it
        // However, our apiClient sets 'Content-Type': 'application/json' by default.
        // We need to override this behavior.
      } as any
    });
  }
};
