import React from "react";

import Image from "next/image";
import ImageBoard from "@/images/logo/logo.svg";

const BoardIcon: React.FC = () => {
  return (
    <div className="bg-[#2B5F44] w-full h-screen flex flex-col items-center justify-center px-6 py-3 rounded-md">
      <Image src={ImageBoard} alt="a Board" className="mx-auto" />
      <h3 className="text-xl font-bold text-white mt-4 text-center">a Board</h3>
    </div>
  );
};

export default BoardIcon;
