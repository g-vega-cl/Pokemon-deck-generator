import React from "react";
import ReactDOM from "react-dom";
import GeneratorPage from "./pages/GeneratorPage";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import "./css/global.scss";
import { Box } from "@mui/system";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Navbar from "./components/Navbar.tsx";
import DeckDetailsPage from "./pages/DeckDetailsPage.tsx";

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
        <Box sx={{overflowX:"hidden"}}>
          <Navbar />
          <Routes>
            <Route exact path="/decks/:id" element={<DeckDetailsPage />} />
            <Route exact path="/" element={<GeneratorPage />} />
          </Routes>
          <ReactQueryDevtools initialIsOpen />
        </Box>
      </Router>
    </PersistQueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
