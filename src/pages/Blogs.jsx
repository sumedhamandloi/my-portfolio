import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { stories } from "../data/stories";

const allTags = ["All", ...new Set(stories.map((s) => s.tag))];

export default function Blogs() {
  const [activeTag, setActiveTag] = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  const filtered = activeTag === "All"
    ? stories
    : stories.filter((s) => s.tag === activeTag);

  return (
    
  );
}
