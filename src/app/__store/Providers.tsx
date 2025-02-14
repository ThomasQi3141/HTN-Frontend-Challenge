"use client";

import { Provider } from "react-redux";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { store } from "./store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <Provider store={store}>{children}</Provider>
    </UserProvider>
  );
}
