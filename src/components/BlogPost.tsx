import PostActions from "@/components/common/PostAction";
import { Post } from "@/app/type";
// BlogFeed.tsx
import React, { useState } from "react";
import IconAvatar from "@/images/avatar/avatar.svg";
import Image from "next/image";
import EditPostModal from "./modal/EditPostModal";
interface BlogPostProps extends Post {
  onEdit?: () => void;
  onDelete?: () => void;
  post?: Post;
}

const BlogPost: React.FC<BlogPostProps> = ({
  title,
  content,
  category,
  author,
  _count,
  onEdit,
  onDelete,
  post,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  return (
    <div className="mb-4 rounded-lg border border-gray-200 bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-3 h-10 w-10 overflow-hidden rounded-full bg-gray-200">
            <Image src={IconAvatar} alt="avatar" />
          </div>
          <span className="text-gray-700">{author.username}</span>
        </div>

        <PostActions onEdit={onEdit} onDelete={onDelete} post={post} />
      </div>
      <div>
        <span className="inline-block rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-600">
          {category}
        </span>
      </div>
      <h2 className="mb-2 text-xl font-semibold text-gray-900">{title}</h2>
      <div className="mb-2 text-sm  text-gray-900">{content} </div>
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
};

export default BlogPost;
