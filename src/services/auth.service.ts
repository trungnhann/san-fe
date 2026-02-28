import { apiClient } from "@/lib/api-client";
import { z } from "zod";

// Schemas based on backend DTOs
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  username: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export const verifyOtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});

export type LoginRequest = z.infer<typeof loginSchema>;
export type RegisterRequest = z.infer<typeof registerSchema>;
export type VerifyOtpRequest = z.infer<typeof verifyOtpSchema>;

export interface User {
  id: string;
  username: string;
  email: string;
  bio?: string;
  image?: string;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

export const authService = {
  login: (data: LoginRequest) => {
    return apiClient.post<LoginResponse>("/auth/login", data);
  },

  refreshToken: (refreshToken: string) => {
    return apiClient.post<TokenResponse>("/auth/refresh", { refresh_token: refreshToken });
  },

  register: (data: RegisterRequest) => {
    // Backend endpoint for create user is /users
    return apiClient.post<User>("/users", data);
  },

  verifyOtp: (data: VerifyOtpRequest) => {
    // Backend endpoint for verify is /users/verify
    return apiClient.post<{ message: string }>("/users/verify", {
      email: data.email,
      otp: data.otp
    });
  },
};
