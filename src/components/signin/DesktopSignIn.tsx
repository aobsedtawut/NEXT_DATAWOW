"use client";

import React from "react";
import BoardIcon from "../BoardIcon";

interface SignInFormData {
  email: string;
  password: string;
}
interface DesktopSignInProps {
  formData: SignInFormData;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}
const DesktopSignIn: React.FC<DesktopSignInProps> = ({
  formData,
  onChangeEmail,
  onChangePassword,
  handleSubmit,
}) => {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="bg-[#253329] flex items-center justify-center">
        <div className="bg-[#253329] p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-white mb-4">Sign in</h2>
          <form onSubmit={handleSubmit}>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Username"
              value={formData.email}
              onChange={onChangeEmail}
              className="bg-[#364641] text-white p-3 rounded-md mb-4 w-full"
            />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="password"
              value={formData.password}
              onChange={onChangePassword}
              className="bg-[#364641] text-white p-3 rounded-md mb-4 w-full"
            />
            <button
              type="submit"
              className="bg-[#243831] text-white py-3 px-6 rounded-md w-full"
            >
              Sign In
            </button>
          </form>
          <a href="/signup">
            <button className="mt-4 bg-[#4CAF50] text-white py-3 px-6 rounded-md w-full">
              Sign Up
            </button>
          </a>
        </div>
      </div>
      <div className="bg-[#253329] w-full">
        <BoardIcon />
      </div>
    </div>
  );
};

export default DesktopSignIn;
