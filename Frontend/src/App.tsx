import React, {useState} from "react";
import GeneratorPage from "./pages/GeneratorPage.tsx";
import "./css/global.scss";
import { Box } from "@mui/system";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Navbar from "./components/Navbar.tsx";
import DeckDetailsPage from "./pages/DeckDetailsPage.tsx";
import DeckListPage from "./pages/DeckListPage.tsx";

const App = () => {
    const [navbarTabValue, setNavbarTabValue] = useState(0);
    return (
    <Router>
        <Box sx={{ overflowX: "hidden" }}>
        <Navbar
            navbarTabValue={navbarTabValue}
            setNavbarTabValue={setNavbarTabValue}
        />
        <Routes>
            <Route path="/decks/list" element={<DeckListPage navbarTabValue={navbarTabValue} setNavbarTabValue={setNavbarTabValue} />} />
            <Route path="/decks/:id" element={<DeckDetailsPage navbarTabValue={navbarTabValue} setNavbarTabValue={setNavbarTabValue} />} />
            <Route path="/" element={<GeneratorPage />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen />
        </Box>
    </Router>
    );
};

export default App;
