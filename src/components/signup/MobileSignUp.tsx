"use client";
import React from "react";
import Image from "next/image";
import ImageBoard from "@/images/logo/logo.svg";
interface SignUpFormData {
  email: string;
  password: string;
  name: string;
  username: string;
}

interface MobileSignUpProps {
  formData: SignUpFormData;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const MobileSignUp: React.FC<MobileSignUpProps> = ({
  formData,
  onChangeEmail,
  onChangePassword,
  onChangeName,
  onChangeUsername,
  handleSubmit,
}) => {
  return (
    <div className="bg-[#1B2B23] min-h-screen  flex flex-col">
      <div className="flex-1 flex items-center justify-center mb-8 bg-[#2B5F44] rounded-b-[20px]">
        <div className="text-center">
          <Image src={ImageBoard} alt="a Board" className="mx-auto" />
          <h1 className="text-white italic text-xl">a Board</h1>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto px-6">
        <h2 className="text-3xl text-white font-medium mb-8">Sign in</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Username"
            value={formData.email}
            onChange={onChangeEmail}
            className="w-full bg-white/10 text-white placeholder:text-gray-400 p-4 rounded-xl border border-white/20 focus:border-white/40 focus:outline-none transition-colors"
          />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={onChangePassword}
            className="w-full bg-white/10 text-white placeholder:text-gray-400 p-4 rounded-xl border border-white/20 focus:border-white/40 focus:outline-none transition-colors"
          />
          <button
            type="submit"
            className="w-full mb-12 bg-[#2B5F44] text-white py-4 px-6 rounded-xl font-medium hover:bg-[#346b4e] transition-colors"
          >
            Sign In
          </button>
        </form>
        <a href="/signup">
          <button className="mt-4 mb-4 bg-[#4CAF50] text-white py-3 px-6 rounded-md w-full">
            Sign Up
          </button>
        </a>
      </div>
    </div>
  );
};

export default MobileSignUp;
