import React from "react";
import ReactDOM from "react-dom";
import GeneratorPage from "./GeneratorPage";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import "./css/global.scss";
import { Box } from "@mui/system";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

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
      <Router>
        <Box>
          <Routes>
            <Route exact path="/" element={<GeneratorPage />}></Route>
          </Routes>
        </Box>
      </Router>
    </PersistQueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
