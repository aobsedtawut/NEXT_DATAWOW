"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import DashboardLayout from "@/layout/PostLayout";
import Image from "next/image";
import CreatePostModal from "@/components/modal/CreatePostModal";
import DeletePostModal from "@/components/modal/DeletePostModal";
import { CommunityCategory, Post } from "../type";
import api from "@/app/api/axios";
import IconAvatar from "@/images/avatar/avatar.svg";
import toast from "react-hot-toast";
import EditPostModal from "@/components/modal/EditPostModal";
import { redirect } from "next/navigation";

// types.ts
export default function Dashboard() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState<CommunityCategory | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleMenuToggle = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { label: "All Posts", category: null },
    { label: "History", category: CommunityCategory.HISTORY },
    { label: "Food", category: CommunityCategory.FOOD },
    { label: "Pets", category: CommunityCategory.PETS },
    { label: "Health", category: CommunityCategory.HEALTH },
    { label: "Fashion", category: CommunityCategory.FASHION },
    { label: "Exercise", category: CommunityCategory.EXERCISE },
    { label: "Others", category: CommunityCategory.OTHERS },
  ];

  const handleCategorySelect = (category: CommunityCategory | null) => {
    setSelectedCategory(category);
    fetchPosts({ category: category || undefined });
    setIsMenuOpen(false);
  };

  const fetchPosts = async (params?: {
    search?: string;
    category?: CommunityCategory;
    authorId?: string;
  }) => {
    try {
      setIsLoading(true);
      const { data } = await api.get("/posts", {
        params: {
          searchTerm: params?.search || searchTerm,
          category: params?.category,
          authorId: session?.user?.id,
        },
      });
      setSelectedPost(data.posts);
      setPosts(data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to load posts");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPost = (post: Post) => {
    setSelectedPost(post);
    setIsEditModalOpen(true);
  };

  const handleDeletePost = (post: Post) => {
    setSelectedPost(post);
    setIsDeleteModalOpen(true);
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchPosts();
  }, [session?.user?.id]);

  return (
    <>
      <DashboardLayout active={1}>
        <div className="mx-auto lg:w-[798px] p-4 bg-brand-gray-100">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                <svg
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="search"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 focus:border-gray-300 focus:outline-none"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  fetchPosts({ search: e.target.value });
                }}
              />
            </div>

            <div className="ml-4 flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={handleMenuToggle}
                  className="flex items-center space-x-1 rounded-lg px-4 py-2 hover:bg-gray-100"
                >
                  <span className="font-medium text-gray-700">Community</span>
                  <svg
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                    {menuItems.map((item) => (
                      <button
                        key={item.category || "all"}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                        onClick={() => handleCategorySelect(item.category)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
                onClick={() => setIsCreateModalOpen(true)}
              >
                Create +
              </button>
              <CreatePostModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
              />
            </div>
          </div>

          {/* Blog Posts */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <>
                <div className="mb-4 rounded-lg border border-gray-200 bg-white p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-3 h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                        <Image src={IconAvatar} alt="avatar" />
                      </div>
                      <span className="text-gray-700">
                        {post.author.username}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditPost(post)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>

                      <button
                        onClick={() => handleDeletePost(post)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="inline-block rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-600">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="mb-2 text-xl font-semibold text-gray-900">
                    {post.title}
                  </h2>
                  <div className="mb-2 text-sm  text-gray-900">
                    {post.content}{" "}
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
                    {post._count?.comments || 0} Comments
                  </div>
                </div>
              </>
            ))}
          </div>
          <EditPostModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedPost(null);
            }}
            post={selectedPost}
            onSave={async (updatedData) => {
              try {
                await api.put(`/posts/${selectedPost?.id}`, updatedData);
                toast.success("Post updated successfully");
                fetchPosts();
                setIsEditModalOpen(false);
                setSelectedPost(null);
              } catch (error) {
                console.error("Error updating post:", error);
                toast.error("Failed to update post");
              }
            }}
          />
          <DeletePostModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={async () => {
              try {
                await api.delete(`/posts/${selectedPost?.id}`);
                toast.success("Post deleted successfully");
                fetchPosts();
                setIsDeleteModalOpen(false);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
              } catch (error) {
                toast.error("Failed to delete post");
              }
            }}
            post={selectedPost}
          />
        </div>
      </DashboardLayout>
    </>
  );
}
