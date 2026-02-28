import { apiClient } from "@/lib/api-client";

export interface Post {
  id: string;
  title: string;
  slug: string;
  image_url?: string;
  abstract?: string;
  body: string;
  published: boolean;
  publish_date?: string;
  location?: string;
  lat?: number;
  lon?: number;
  locale?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
  author_username: string;
  author_avatar_url?: string;
  author_name: string;
  like_count: number;
  user_has_liked: boolean;
}

export interface CreatePostRequest {
  title: string;
  slug: string;
  image?: File;
  abstract?: string;
  body: string;
  published: boolean;
  location?: string;
  lat?: number;
  lon?: number;
  locale?: string;
  tags?: string[];
}

export const postService = {
  getUserPosts: (userId: string, page = 1, pageSize = 10) => {
    return apiClient.get<Post[]>(`/users/${userId}/posts?page=${page}&page_size=${pageSize}`);
  },

  createPost: (data: CreatePostRequest) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("body", data.body);
    formData.append("published", String(data.published));
    
    if (data.image) {
      formData.append("image", data.image);
    }
    if (data.abstract) formData.append("abstract", data.abstract);
    if (data.location) formData.append("location", data.location);
    if (data.lat) formData.append("lat", String(data.lat));
    if (data.lon) formData.append("lon", String(data.lon));
    if (data.locale) formData.append("locale", data.locale);
    if (data.tags) {
        data.tags.forEach(tag => formData.append("tags", tag));
    }

    return apiClient.request<Post>("/posts", {
      method: "POST",
      body: formData as any,
      headers: {} as any
    });
  }
};
