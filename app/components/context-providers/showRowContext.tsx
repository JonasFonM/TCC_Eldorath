// app/context/ShowRowContext.tsx
import React, { createContext, useContext, useRef, useState } from "react";

type ShowRowContextType = {
  show: string[];
  showRow: (n: string) => void;
  isShown: (n: string) => boolean;
};

const ShowRowContext = createContext<ShowRowContextType | undefined>(undefined);

export const ShowRowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const show = useRef<string[]>([]);
  const [, forceUpdate] = useState(0);

  const showRow = (n: string) => {
    if (show.current.includes(n)) {
      show.current = show.current.filter(ns => ns !== n);
    } else {
      show.current.push(n);
    }
    forceUpdate(n => n + 1);
  };

  const isShown = (n: string) => show.current.includes(n);

  return (
    <ShowRowContext.Provider value={{ show: show.current, showRow, isShown }}>
      {children}
    </ShowRowContext.Provider>
  );
};

export const useShowRow = (): ShowRowContextType => {
  const context = useContext(ShowRowContext);
  if (!context) throw new Error("useShowRow must be used within a ShowRowProvider");
  return context;
};