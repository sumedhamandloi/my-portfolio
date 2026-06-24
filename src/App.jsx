import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import GlowCursor from "./components/GlowCursor";
import AmbientBackground from "./components/AmbientBackground";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import PageTransition from "./components/PageTransition";
import Loader from "./components/Loader.jsx";

function AnimatedRoutes() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  return (
    <AnimatePresence mode="wait">
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
        <Route path="/skills" element={<PageTransition><Skills /></PageTransition>} />
        <Route path="/blogs" element={<PageTransition><Blogs /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <GlowCursor />
      <AmbientBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}