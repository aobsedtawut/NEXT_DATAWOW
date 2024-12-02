import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface SignInCredentials {
  email: string;
  password: string;
}

export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInUser = async ({ email, password }: SignInCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(
          result.error === "CredentialsSignin"
            ? "Invalid email or password"
            : result.error
        );
        return false;
      }

      if (result?.ok) {
        router.push("/post");
        router.refresh();
        return true;
      }

      return false;
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error("SignIn Error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signInUser,
    isLoading,
    error,
    setError,
  };
}
