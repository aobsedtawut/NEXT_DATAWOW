import React, { useState } from "react";
import api from "@/app/api/axios";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateCommentModal({
  isOpen,
  onClose,
}: CreatePostModalProps) {
  const [formData, setFormData] = useState({
    content: "",
    postId: 0,
    authorId: 0,
  });
  const pathname = usePathname();
  const { data: session } = useSession();
  const splitpath = pathname?.split("/");

  const id = splitpath?.[splitpath.length - 1] ?? "";
  const [error, setError] = useState<string | null>(null);
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const promise = api.post("/comments", formData).then(() => {
      setFormData({
        content: "",
        postId: parseInt(id || "0"),
        authorId: parseInt(session?.user?.id || "0"),
      });
      onClose();
    });

    try {
      await promise;
      toast.promise(promise, {
        loading: "Creating post...",
        success: "Post created successfully!",
        error: (err) => err?.response?.data?.message || "Failed to create post",
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to create post"
      );
    } finally {
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Add Comments</h2>
            <button
              onClick={onClose}
              className="rounded-lg p-1 hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-500">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="What's on your mind..."
                className="w-full h-32 gap-3 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                minLength={3}
              />
            </div>

            <div className="flex flex-col gap-3 p-4 border-t border-gray-100">
              <button
                type="button"
                className="w-full px-4 py-3 text-green-600 font-medium rounded-lg border border-green-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                className="w-full px-4 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700"
                onClick={handleSubmit}
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
