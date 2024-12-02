import React, { useState, useEffect } from "react";
import { Post } from "@/app/type";

interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post | null;
  onSave: (updatedData: Partial<Post>) => void;
}
const categories = [
  "HISTORY",
  "FOOD",
  "PETS",
  "HEALTH",
  "FASHION",
  "EXERCISE",
  "OTHERS",
];
const EditPostModal: React.FC<EditPostModalProps> = ({
  isOpen,
  onClose,
  post,
  onSave,
}) => {
  if (!isOpen || !post) return null;

  const [updatedData, setUpdatedData] = useState<Partial<Post>>({
    title: post.title,
    content: post.content,
    category: post.category,
  });

  useEffect(() => {
    if (post) {
      setUpdatedData({
        title: post.title,
        content: post.content,
        category: post.category,
      });
    }
  }, [post]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(updatedData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Edit Post</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
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

        <div className="mb-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={updatedData.category}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              onChange={handleChange}
              required
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0) + category.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            name="title"
            value={updatedData.title}
            className="mb-4 mt-4 w-full rounded-lg border border-gray-300 p-2"
            onChange={handleChange}
          />
          <textarea
            name="content"
            value={updatedData.content}
            className="h-32 w-full rounded-lg border border-gray-300 p-2"
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;
