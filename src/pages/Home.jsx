import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const roles = ["UI/UX Designer", "AI Enthusiast", "Web Developer", "Problem Solver"];

const projects = [
  {
    id: 1,
    title: "Project Alpha",
    desc: "A placeholder for your first featured project. Replace with real content.",
    tag: "ML"
  },
  {
    id: 2,
    title: "Project Beta",
    desc: "A placeholder for your second featured project. Replace with real content.",
    tag: "Web"
  },
  {
    id: 3,
    title: "Project Gamma",
    desc: "A placeholder for your third featured project. Replace with real content.",
    tag: "Design"
  }
];

const blogs = [
  { id: 1, title: "The Overfitted Model", type: "failure", date: "Oct 2025" },
  { id: 2, title: "GDG Design Lead Appointment", type: "success", date: "Jan 2026" },
];

function Typewriter({ words }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    let timeout;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((index + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index, words]);

  return (
    <span style={{ color: "var(--accent)", borderRight: "2px solid var(--accent)", paddingRight: 4 }}>
      {displayed}
    </span>
  );
}

export default function Home() {
  const { dark, toggle } = useTheme();

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "4rem 2rem" }}>

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: "5rem" }}
      >
        <p style={{ color: "var(--accent2)", marginBottom: "0.5rem", letterSpacing: 2, fontSize: "0.85rem" }}>
          WELCOME TO MY PORTFOLIO
        </p>
        <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "1rem" }}>
          Sumedha<br />Mandloi
        </h1>
        <h2 style={{ fontSize: "clamp(1.2rem, 3vw, 1.8rem)", fontWeight: 400, marginBottom: "2rem", color: "var(--text-muted)" }}>
          <Typewriter words={roles} />
        </h2>
        <p style={{ maxWidth: 520, lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "2.5rem" }}>
          IT undergrad at IIPS, DAVV, Indore. Always building something new —
          whether it's an ML model or a clean UI. Let's talk tech over coffee.
        </p>
        <Link to="/projects">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "0.8rem 2rem",
              background: "transparent",
              border: "2px solid var(--accent)",
              color: "var(--accent)",
              borderRadius: 8,
              fontSize: "1rem",
              cursor: "pointer",
              fontWeight: 600,
              letterSpacing: 1
            }}
          >
            See My Work →
          </motion.button>
        </Link>
      </motion.section>

      {/* About */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: "5rem" }}
      >
        <h3 style={{ fontSize: "0.8rem", letterSpacing: 3, color: "var(--accent2)", marginBottom: "1rem" }}>
          ABOUT
        </h3>
        <p style={{ fontSize: "1.1rem", lineHeight: 1.9, maxWidth: 620, color: "var(--text-muted)" }}>
          I believe in making impact and solving problems efficiently — leveraging
          development skills, design thinking, and a genuine curiosity for AI.
          I'm always up for a new project or a conversation about tech.
        </p>
      </motion.section>

      {/* Featured Projects */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: "5rem" }}
      >
        <h3 style={{ fontSize: "0.8rem", letterSpacing: 3, color: "var(--accent2)", marginBottom: "1.5rem" }}>
          FEATURED PROJECTS
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.2rem" }}>
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "1.5rem",
                cursor: "pointer"
              }}
            >
              <span style={{
                fontSize: "0.7rem", letterSpacing: 2,
                color: "var(--accent)", background: "var(--bg)",
                padding: "2px 8px", borderRadius: 20, border: "1px solid var(--accent)"
              }}>
                {p.tag}
              </span>
              <h4 style={{ margin: "0.8rem 0 0.4rem", fontSize: "1.05rem" }}>{p.title}</h4>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Blog Preview */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h3 style={{ fontSize: "0.8rem", letterSpacing: 3, color: "var(--accent2)", marginBottom: "1.5rem" }}>
          LATEST STORIES
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          {blogs.map(b => (
            <Link to="/blogs" key={b.id}>
              <motion.div
                whileHover={{ x: 6 }}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "1rem 1.2rem",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                  <span style={{ fontSize: "1rem" }}>{b.type === "success" ? "🟢" : "🔴"}</span>
                  <span style={{ fontWeight: 500 }}>{b.title}</span>
                </div>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{b.date}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* Theme Toggle */}
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: "fixed", bottom: "2rem", right: "2rem",
          width: 48, height: 48, borderRadius: "50%",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          fontSize: "1.3rem", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
        }}
      >
        {dark ? "☀️" : "🌙"}
      </motion.button>

    </div>
  );
}