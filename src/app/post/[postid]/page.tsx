"use client";

import { useEffect, useState } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import DashboardLayout from "@/layout/PostLayout";
import Image from "next/image";
import { Post, Comment } from "../../type";
import api from "@/app/api/axios";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import IconAvatar from "@/images/avatar/avatar.svg";
import BackButton from "@/components/common/BackButton";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";
import CreateCommentModal from "@/components/modal/CreateCommentModal";
export default function BlogPostDetail() {
  const pathname = usePathname();
  const splitpath = pathname?.split("/");

  const id = splitpath?.[splitpath.length - 1] ?? "";
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [posts, setPosts] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [commentsList, setListComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");

  const { data: session } = useSession();
  const commentSubmit = async (): Promise<void> => {
    const promise = api.post(`/comments`, {
      content: comment,
      postId: parseInt(id),
      authorId: session?.user?.id,
    });
    try {
      await toast.promise(promise, {
        loading: "Posting comment...",
        success: "Comment posted successfully!",
        error: (err) =>
          err?.response?.data?.message || "Failed to post comment",
      });

      setComment("");
      const { data } = await api.get(`/comments/post/${id}`);
      setListComments(data);
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Failed to submit comment");
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await api.get(`/comments/post/${id}`);

        setListComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [id]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        console.log(id);
        const { data } = await api.get(`/posts/${id}`);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast.error("Failed to load posts");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!posts) {
    return <div>Post not found</div>;
  }
  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 24 * 30) {
      const days = Math.floor(diffInHours / 24);
      return `${days}d ago`;
    } else {
      const months = Math.floor(diffInHours / (24 * 30));
      return `${months}mo. ago`;
    }
  };

  return (
    <>
      <DashboardLayout active={1}>
        <div className="mx-auto lg:w-[798px] p-4 bg-brand-gray-100">
          <div className="w-full">
            <div className="space-y-4">
              <div className="rounded-lg border border-gray-200 bg-white p-6 sm:p-8">
                <BackButton
                  className="mb-8"
                  onClick={() => window.history.back()}
                />
                <div className="mb-4 flex items-center">
                  <div className="mr-3 h-15 w-15 overflow-hidden rounded-full bg-gray-200">
                    <Image src={IconAvatar} alt="" className="h-full w-full " />
                  </div>
                  <div>{posts.author.username}</div>
                </div>
                <div>
                  <span className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-600">
                    {posts.category}
                  </span>
                </div>
                <h1 className="mb-2 text-3xl font-semibold text-gray-900">
                  {posts.title}
                </h1>
                <div className="w-full mb-4 text-base text-gray-900 ">
                  {posts.content}
                </div>
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
                  {posts._count?.comments || 0} Comments
                </div>
                {isMobile && (
                  <button
                    className="flex mt-4 mb-4 text-green-300 font-bold py-3 px-3 rounded-md w-auto border border-green-300"
                    onClick={() => setIsCreateModalOpen(true)}
                  >
                    Add Comment
                  </button>
                )}
                {!isMobile && (
                  <div className="mt-4 flex flex-col">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="What's on your mind..."
                      className="w-full gap-3 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      autoFocus
                    />

                    <div className="flex justify-end gap-3 p-4 border-t border-gray-100">
                      <button
                        type="button"
                        className="px-4 py-2 text-green-600 font-medium rounded-md hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700"
                        onClick={commentSubmit}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                )}
                <div className="flex flex-col gap-6">
                  {commentsList.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <User className="w-6 h-6 text-gray-400" />
                        </div>
                      </div>

                      {/* Comment Content */}
                      <div className="flex-1">
                        {/* Author and Timestamp */}
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">
                            {comment.author.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {formatTimestamp(comment.createdAt)}
                          </span>
                        </div>

                        {/* Comment Text */}
                        <p className="text-gray-700 leading-normal w-full">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <CreateCommentModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
          />
        </div>
      </DashboardLayout>
    </>
  );
}
