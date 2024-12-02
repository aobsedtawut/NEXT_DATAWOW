// import api from "./axios";
// import { Post, CreatePostDto, UpdatePostDto } from "@/app/types/post";

// export const postApi = {
//   // Get all posts
//   getPosts: async (params?: { category?: string; authorId?: number }) => {
//     const { data } = await api.get<Post[]>("/posts", { params });
//     return data;
//   },

//   // Get single post
//   getPost: async (id: number) => {
//     const { data } = await api.get<Post>(`/posts/${id}`);
//     return data;
//   },

//   // Create post
//   createPost: async (postData: CreatePostDto) => {
//     const { data } = await api.post<Post>("/posts", postData);
//     return data;
//   },

//   // Update post
//   updatePost: async (id: number, postData: UpdatePostDto) => {
//     const { data } = await api.put<Post>(`/posts/${id}`, postData);
//     return data;
//   },

//   // Delete post
//   deletePost: async (id: number) => {
//     await api.delete(`/posts/${id}`);
//   },
// };
