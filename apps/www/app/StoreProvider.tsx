"use client";

import { setupListeners } from "@reduxjs/toolkit/query";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { Persistor } from "redux-persist/es/types";
import { PersistGate } from "redux-persist/integration/react";

import { Audio } from "@/lib/redux/audio";
import { type AppStore, makeStore } from "@/lib/redux/store";

interface Props {
  readonly children: ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  const storeRef = useRef<AppStore | null>(null);
  const persistRef = useRef<Persistor | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  if (!persistRef.current) {
    persistRef.current = persistStore(storeRef.current);
  }

  useEffect(() => {
    if (storeRef.current != null) {
      // configure listeners using the provided defaults
      // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistRef.current}>
        {children}
      </PersistGate>
      <Audio />
    </Provider>
  );
};