"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { NotificationProvider } from "@/context/NotificationContext";

export default function Providers({ children }: any) {
  return (
    <NotificationProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </NotificationProvider>
  );
}