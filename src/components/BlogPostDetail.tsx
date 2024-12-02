// BlogPostDetail.tsx
import { Post } from "@/app/type";
import React from "react";

interface BlogPostDetailProps extends Post {}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({
  title,
  content,
  category,
  author,
  _count,
}) => (
  <div className="rounded-lg border border-gray-200 bg-white p-6">
    <div className="mb-4 flex items-center">
      <div className="mr-3 h-10 w-10 overflow-hidden rounded-full bg-gray-200">
        <img
          src="/api/placeholder/40/40"
          className="h-full w-full object-cover"
        />
      </div>
      <div>{author.username}</div>
    </div>
    <div>
      <span className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-600">
        {category}
      </span>
    </div>
    <h1 className="mb-2 text-3xl font-semibold text-gray-900">{title}</h1>
    <div className="mb-4 text-base text-gray-900">{content}</div>
    <div className="flex items-center text-sm text-gray-500">
      <svg
        className="mr-2 h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      {_count?.comments || 0} Comments
    </div>
  </div>
);

export default BlogPostDetail;
