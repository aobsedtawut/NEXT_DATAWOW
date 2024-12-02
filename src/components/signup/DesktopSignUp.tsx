"use client";

import React from "react";
import BoardIcon from "@/components/BoardIcon";

interface SignUpFormData {
  email: string;
  password: string;
  name: string;
  username: string;
}

interface DesktopSignUpProps {
  formData: SignUpFormData;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const DesktopSignUp: React.FC<DesktopSignUpProps> = ({
  formData,
  onChangeEmail,
  onChangePassword,
  onChangeName,
  onChangeUsername,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 h-screen">
        <div className="bg-[#253329] flex items-center justify-center">
          <div className="bg-[#253329] p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-white mb-4">Sign up</h2>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={onChangeName}
              className="bg-[#364641] text-white p-3 rounded-md mb-4 w-full"
            />
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={onChangeUsername}
              className="bg-[#364641] text-white p-3 rounded-md mb-4 w-full"
            />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={onChangeEmail}
              className="bg-[#364641] text-white p-3 rounded-md mb-4 w-full"
            />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={onChangePassword}
              className="bg-[#364641] text-white p-3 rounded-md mb-4 w-full"
            />
            <button
              type="submit"
              className="bg-green-500 text-white py-3 px-6 rounded-md w-full"
            >
              Sign Up
            </button>
          </div>
        </div>
        <div className="bg-[#253329] w-full">
          <BoardIcon />
        </div>
      </div>
    </form>
  );
};

export default DesktopSignUp;
