import { motion } from "framer-motion";

export default function Blogs() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "4rem 2rem" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p style={{ color: "var(--accent2)", letterSpacing: 2, fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.5rem" }}>
          WRITING & THINKING
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, marginBottom: "1rem" }}>
          Stories
        </h1>
        <p style={{ color: "var(--text-muted)", lineHeight: 1.8, fontSize: "1rem", maxWidth: 480 }}>
          I'm working on some stories — wins, failures, and lessons learned
          along the way. Check back soon.
        </p>
      </motion.div>
    </div>
  );
}
