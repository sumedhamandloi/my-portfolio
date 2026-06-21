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
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "4rem 2rem" }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: "2.5rem" }}
      >
        <p style={{ color: "var(--accent2)", letterSpacing: 2, fontSize: "0.85rem", marginBottom: "0.5rem" }}>
          WRITING & THINKING
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, marginBottom: "1rem" }}>
          Stories
        </h1>
        <p style={{ color: "var(--text-muted)", maxWidth: 500, lineHeight: 1.7 }}>
          Wins, failures, and everything I'm learning along the way.
        </p>
      </motion.div>

      {/* Filter Tags */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "2.5rem" }}
      >
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            style={{
              padding: "0.4rem 1.1rem",
              borderRadius: 20,
              border: `1px solid ${activeTag === tag ? "var(--accent)" : "var(--border)"}`,
              background: activeTag === tag ? "var(--accent)" : "transparent",
              color: activeTag === tag ? "#fff" : "var(--text-muted)",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: activeTag === tag ? 600 : 400,
              transition: "all 0.2s",
            }}
          >
            {tag}
          </button>
        ))}
      </motion.div>

      {/* Story Grid */}
      <motion.div
        layout
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.4rem",
        }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((s, i) => {
            const isOpen = expandedId === s.id;
            return (
              <motion.div
                key={s.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setExpandedId(isOpen ? null : s.id)}
                whileHover={{ y: -4 }}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  padding: "1.6rem",
                  cursor: "pointer",
                  gridColumn: isOpen ? "1 / -1" : "auto",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem" }}>
                  <span style={{
                    fontSize: "0.7rem", letterSpacing: 2,
                    color: "var(--accent)", border: "1px solid var(--accent)",
                    padding: "2px 8px", borderRadius: 20,
                  }}>
                    {s.tag}
                  </span>
                  <span style={{ fontSize: "0.9rem" }}>
                    {s.type === "success" ? "🟢" : "🔴"}
                  </span>
                </div>

                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: "0 0 0.6rem" }}>
                  {s.title}
                </h3>

                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>
                  {isOpen ? s.content : s.excerpt}
                </p>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  <span>{s.date}</span>
                  <span>{s.readTime}</span>
                </div>

                <span style={{ display: "block", marginTop: "0.6rem", fontSize: "0.8rem", color: "var(--accent2)", fontWeight: 600 }}>
                  {isOpen ? "Show less ↑" : "Read more →"}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}