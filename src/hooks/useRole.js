"use client";

import { useContext, createContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import useLocalStorage from "@/hooks/useLocalStorage";

const RoleContext = createContext();

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}

export function RoleProvider({ children }) {
  const { data: session } = useSession();
  const user = session;
  const [userRoleId, setUserRoleId, removeUserRoleId] = useLocalStorage(
    "userRoleId",
    user?.user.id
  );

  useEffect(() => {
    if (user?.user.id.length > 0) {
      setUserRoleId(user?.user.id);
    }
  }, [setUserRoleId, user?.user.id]);

  const clearAllData = () => {
    removeUserRoleId();
  };

  return (
    <RoleContext.Provider
      value={{
        userRoleId,
        clearAllData,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}
