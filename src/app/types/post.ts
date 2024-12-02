import { CommunityCategory } from "../type";

export interface CreatePostDto {
  title: string;
  content: string;
  category: CommunityCategory;
}

export interface UpdatePostDto {
  title?: string;
  content?: string;
  category?: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}
