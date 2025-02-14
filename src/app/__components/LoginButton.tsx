"use client";

import React from "react";
import MenuButton from "./MenuButton";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

const LoginButton = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();

  return user ? (
    <MenuButton onClick={() => router.push("/api/auth/logout")}>
      Logout
    </MenuButton>
  ) : (
    <MenuButton onClick={() => router.push("/api/auth/login")}>
      Login
    </MenuButton>
  );
};

export default LoginButton;
