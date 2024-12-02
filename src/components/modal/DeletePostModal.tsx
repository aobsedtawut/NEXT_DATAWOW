import React from "react";
import { Post } from "@/app/type";

interface DeletePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  post: Post | null;
}
const DeletePostModal: React.FC<DeletePostModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  post,
}) => {
  if (!isOpen || !post) return null;

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Please confirm if you wish to delete the post
          </h2>
        </div>
        <div className="text-sm text-gray-500">
          Are you sure you want to delete the post? Once deleted, it cannot be
          recovered.
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-green-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePostModal;
