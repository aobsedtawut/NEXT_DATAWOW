"use client";
// pages/index.tsx
import React from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import DesktopSignUp from "@/components/signup/DesktopSignUp";
import MobileSignUp from "@/components/signup/MobileSignUp";
import useMediaQuery from "@/hooks/useMediaQuery";
import MobileSignIn from "@/components/signin/MobileSignIn";
import api from "@/app/api/axios";
import { toast } from "react-hot-toast";

interface SignInFormData {
  email: string;
  password: string;
  name: string;
  username: string;
}
const SignUpPage: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
    name: "",
    username: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Sign up
      const signUpResponse = await api.post("/auth/signup", formData, {
        headers: { "Content-Type": "application/json" },
      });

      // If successful, show success message and redirect
      toast.success("Account created successfully!");
      router.push("/post");
    } catch (error: any) {
      // Handle axios error responses
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data.message || "Signup failed";
        setError(errorMessage);
        toast.error(errorMessage);
      } else if (error.request) {
        // Request made but no response received
        setError("Network error. Please try again.");
        toast.error("Network error. Please try again.");
      } else {
        // Something else went wrong
        setError("An unexpected error occurred");
        toast.error("An unexpected error occurred");
      }
      console.error("SignUp Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };
  return (
    <div>
      {isMobile ? (
        <MobileSignUp
          formData={formData}
          handleSubmit={handleSubmit}
          onChangeEmail={handleChange}
          onChangePassword={handleChange}
          onChangeName={handleChange}
          onChangeUsername={handleChange}
        />
      ) : (
        <DesktopSignUp
          formData={formData}
          handleSubmit={handleSubmit}
          onChangeEmail={handleChange}
          onChangePassword={handleChange}
          onChangeName={handleChange}
          onChangeUsername={handleChange}
        />
      )}
    </div>
  );
};

export default SignUpPage;
