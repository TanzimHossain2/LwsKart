"use client";

import { ReactNode } from "react";
import StoreProvider from "./StoreProvider";
import ToastProvider from "./ToastProvider";
import XSessionProvider from "./XSessionProvider";

export default function GlobalProvider({ children }: { children: ReactNode }) {
  return (
    <>
        <StoreProvider>
          <ToastProvider>{children}</ToastProvider>
        </StoreProvider>
    </>
  );
}
