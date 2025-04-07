"use client";

import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth/auth-client";
import React, { useEffect } from "react";

const AuthContext = React.createContext<typeof auth.$Infer.Session | null>(
  null
);

export const useSession = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useSession must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const session = authClient.useSession();

  useEffect(() => {
    if (!session.data && !session.isPending) {
      authClient.signIn.anonymous();
    }
  }, [session.data, session.isPending]);

  return (
    <AuthContext.Provider value={session.data}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
