"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import DesktopTopBar from "../../components/DesktopTopbar";
import MobileTopBar from "../../components/MobileTopbar";
import DashboardLayout from "@/layout/PostLayout";
import { Search } from "lucide-react";
import BlogPost from "@/components/BlogPost";
import CreatePostModal from "@/components/modal/CreatePostModal";
import { CommunityCategory, Post } from "../type";
import api from "@/app/api/axios";
import toast from "react-hot-toast";
// types.ts
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Dashboard() {
  const { data: session, status } = useSession();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] =
    useState<CommunityCategory | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleCreateClick = () => {
    if (status === "authenticated") {
      setIsCreateModalOpen(true);
    } else {
      router.push("/");
    }
  };
  const fetchPosts = async (params?: {
    search?: string;
    category?: CommunityCategory;
  }) => {
    try {
      setIsLoading(true);
      const { data } = await api.get("/posts", {
        params: {
          searchTerm: params?.search,
          category: params?.category,
        },
      });

      setPosts(data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to load posts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [session?.user?.id]);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <DashboardLayout active={0}>
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
                        onClick={() => {
                          setSelectedCategory(item.category || null);
                          fetchPosts({ category: item.category || undefined });
                          setIsMenuOpen(false);
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
                onClick={handleCreateClick}
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
            {filteredPosts.map((post, index) => (
              <Link key={post.id} href={`/post/${post.id}`}>
                <BlogPost key={index} {...post} />{" "}
              </Link>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
