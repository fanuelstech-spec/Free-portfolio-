/**
 * Portfolio Data Model & API Contract
 */

export interface ProfileLinks {
  github?: string | null;
  website?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  [key: string]: string | null | undefined;
}

export interface Profile {
  username: string;
  display_name: string;
  bio?: string | null;
  avatar_url?: string | null;
  cover_url?: string | null;
  location?: string | null;
  availability?: 'open_to_work' | 'freelance' | 'unavailable' | string | null;
  skills?: string[] | null;
  links?: ProfileLinks | null;
  verified?: boolean | null;
  joined_at?: string | null;
  url?: string | null;
}

export interface Project {
  id: string;
  title: string;
  description?: string | null;
  cover_url?: string | null;
  images?: string[] | null;
  tech_stack?: string[] | null;
  live_url?: string | null;
  repo_url?: string | null;
  created_at?: string | null;
  url?: string | null;
}

export interface Post {
  id: string;
  content?: string | null;
  images?: string[] | null;
  preview_title?: string | null;
  preview_description?: string | null;
  preview_url?: string | null;
  preview_image_url?: string | null;
  created_at: string;
  url?: string | null;
}

export interface PortfolioResponse {
  profile: Profile;
  projects: Project[];
  posts: Post[];
}

export interface ApiFetchOptions {
  username?: string;
  apiKey?: string;
  limit?: number;
  offset?: number;
}
