import React from "react";
import ReactDOM from "react-dom";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import "./css/global.scss";
import App from "./App.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 48, // 48 hours
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

ReactDOM.render(
  <React.StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <App />
    </PersistQueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
