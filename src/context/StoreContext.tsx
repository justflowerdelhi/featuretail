"use client";

import { createContext, useContext } from "react";

const StoreContext = createContext<any>(null);

export function StoreProvider({ store, children }: any) {
  return (
    <StoreContext.Provider value={{ store }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used inside StoreProvider");
  }

  return context;
}