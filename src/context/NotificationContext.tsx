"use client";

import { createContext, useContext, useState } from "react";

const NotificationContext = createContext<any>(null);

export const NotificationProvider = ({ children }: any) => {
  const [notifications, setNotifications] = useState<any[]>([]);

  const addNotification = (message: string) => {
    const id = Date.now();

    setNotifications((prev) => [
      ...prev,
      { id, message },
    ]);

    // auto remove after 3 sec (IMPORTANT)
    setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((n) => n.id !== id)
      );
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);