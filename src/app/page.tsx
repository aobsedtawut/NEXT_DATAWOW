"use client";
// pages/index.tsx
import React from "react";
import { useState } from "react";
import MobileSignIn from "../components/signin/MobileSignIn";
import DesktopSignIn from "../components/signin/DesktopSignIn";
import useMediaQuery from "../hooks/useMediaQuery";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface SignInFormData {
  email: string;
  password: string;
}
const Home: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const signInPromise = signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    toast.promise(signInPromise, {
      loading: "Signing in...",
      success: (result) => {
        if (result?.error) {
          throw new Error(
            result.error === "CredentialsSignin"
              ? "Invalid email or password"
              : result.error
          );
        }
        if (result?.ok) {
          router.push("/post");
          router.refresh();
          return "Signed in successfully!";
        }
        return "";
      },
      error: (err) => err.message || "An unexpected error occurred",
    });

    try {
      await signInPromise;
    } catch (error) {
      console.error("SignIn Error:", error);
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
        <MobileSignIn
          formData={formData}
          handleSubmit={handleSubmit}
          onChangeEmail={handleChange}
          onChangePassword={handleChange}
        />
      ) : (
        <DesktopSignIn
          formData={formData}
          handleSubmit={handleSubmit}
          onChangeEmail={handleChange}
          onChangePassword={handleChange}
        />
      )}
    </div>
  );
};

export default Home;
