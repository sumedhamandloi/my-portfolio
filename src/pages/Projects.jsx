import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Edufolio",
    desc: "Centralized student achievement platform solving a real SIH problem — tracks academics, certifications, clubs, internships and auto-generates verified portfolios for NAAC accreditation.",
    tech: ["HTML", "CSS", "JavaScript"],
    tag: "SIH",
    status: "In Progress",
    statusColor: "#f5a623",
    achievement: "📋 Smart India Hackathon Problem Statement",
    github: "https://github.com/Rachitneema03/EduFolio",
    live: null,
  },
  {
    id: 2,
    title: "Capscout",
    desc: "Digital Shark Tank platform connecting startups with the right investors, featuring AI-powered risk assessment and recommendation engine. Ideated and led a team to build this at a hackathon.",
    tech: ["Next.js", "MERN (planned)"],
    tag: "Concept",
    status: "Concept",
    statusColor: "#00b4ff",
    achievement: "💡 Solo ideator, hackathon team lead",
    github: null,
    live: null,
  },
  {
    id: 3,
    title: "KrishiMitra",
    desc: "Bilingual AI-powered conversational agent giving small farmers real-time access to market prices, weather forecasts, and plant disease diagnosis via image recognition.",
    tech: ["Python", "TensorFlow", "Keras", "OpenCV", "Streamlit"],
    tag: "AI/ML",
    status: "Deployed",
    statusColor: "#00c896",
    achievement: "🏆 Top 8 — IBM SkillsBuild Hackathon",
    github: "https://github.com/sumedhamandloi/KrishiMitra-AI",
    live: null,
  },
  {
    id: 4,
    title: "JS Slot Machine",
    desc: "Command-line slot machine game with dynamic betting logic, weighted random symbol generation, and matrix transposition for win detection. A deep dive into JavaScript fundamentals.",
    tech: ["JavaScript (ES6+)", "Node.js"],
    tag: "JS",
    status: "Completed",
    statusColor: "#00c896",
    achievement: null,
    github: "https://github.com/sumedhamandloi/js-slot-machine",
    live: null,
  },
  {
    id: 5,
    title: "Rock Paper Scissors",
    desc: "Fully interactive Rock Paper Scissors game against the computer with real-time score tracking, dynamic feedback, and clean responsive UI built entirely with vanilla JavaScript.",
    tech: ["HTML5", "CSS3", "JavaScript (ES6+)"],
    tag: "Web",
    status: "Completed",
    statusColor: "#00c896",
    achievement: null,
    github: "https://github.com/sumedhamandloi/Rock-paper-scissors",
    live: null,
  },
];

const allTags = ["All", ...new Set(projects.map((p) => p.tag))];

// Tag pill color map — ties into your accent palette
const tagColors = {
  SIH:     { bg: "#e040fb22", border: "#e040fb", text: "#e040fb" },
  "AI/ML": { bg: "#00c89622", border: "#00c896", text: "#00c896" },
  Concept: { bg: "#00b4ff22", border: "#00b4ff", text: "#00b4ff" },
  JS:      { bg: "#f5a62322", border: "#f5a623", text: "#f5a623" },
  Web:     { bg: "#e040fb22", border: "#e040fb", text: "#e040fb" },
};

function TagPill({ tag, small = false }) {
  const colors = tagColors[tag] || { bg: "#ffffff22", border: "#ffffff55", text: "#fff" };
  return (
    <span
      style={{
        display: "inline-block",
        padding: small ? "2px 10px" : "4px 14px",
        borderRadius: 999,
        fontSize: small ? "0.72rem" : "0.78rem",
        fontWeight: 600,
        letterSpacing: "0.04em",
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        color: colors.text,
      }}
    >
      {tag}
    </span>
  );
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      className = "glass-panel"
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? "var(--accent)" : "var(--border)"}`,
        borderRadius: 16,
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        cursor: "default",
        transition: "border-color 0.25s",
        boxShadow: hovered
          ? "0 0 24px var(--accent)33, 0 4px 30px rgba(0,0,0,0.3)"
          : "0 2px 16px rgba(0,0,0,0.2)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle glow wash on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at top left, var(--accent)08, transparent 60%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
          pointerEvents: "none",
          borderRadius: 16,
        }}
      />

      {/* Top row: tag + status */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <TagPill tag={project.tag} />
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: project.statusColor,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: project.statusColor,
              display: "inline-block",
              boxShadow: `0 0 6px ${project.statusColor}`,
            }}
          />
          {project.status}
        </span>
      </div>

      {/* Title */}
      <h2
        style={{
          fontSize: "1.35rem",
          fontWeight: 700,
          color: "var(--text)",
          margin: 0,
          lineHeight: 1.3,
        }}
      >
        {project.title}
      </h2>

      {/* Description */}
      <p
        style={{
          fontSize: "0.9rem",
          color: "var(--text-muted)",
          lineHeight: 1.6,
          margin: 0,
          flexGrow: 1,
        }}
      >
        {project.desc}
      </p>

      {/* Achievement badge */}
      {project.achievement && (
        <p
          style={{
            fontSize: "0.8rem",
            color: "var(--accent2)",
            margin: 0,
            fontWeight: 500,
          }}
        >
          {project.achievement}
        </p>
      )}

      {/* Tech stack */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {project.tech.map((t) => (
          <span
            key={t}
            style={{
              fontSize: "0.72rem",
              background: "var(--border)",
              color: "var(--text-muted)",
              borderRadius: 6,
              padding: "3px 10px",
              fontFamily: "monospace",
              letterSpacing: "0.02em",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "0.75rem" }}>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.82rem",
              color: "var(--accent)",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 4,
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            GitHub ↗
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.82rem",
              color: "var(--accent2)",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 4,
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Live ↗
          </a>
        )}
        {!project.github && !project.live && (
          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Links coming soon
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeTag, setActiveTag] = useState("All");

  const filtered =
    activeTag === "All" ? projects : projects.filter((p) => p.tag === activeTag);

  return (
    <div
      style={{
        maxWidth: 980,
        margin: "0 auto",
        padding: "4rem 2rem 6rem",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: "3rem" }}
      >
        <p
          style={{
            color: "var(--accent2)",
            letterSpacing: "0.2em",
            fontSize: "0.78rem",
            fontWeight: 600,
            marginBottom: "0.5rem",
            textTransform: "uppercase",
          }}
        >
          Things I've built
        </p>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            color: "var(--text)",
          }}
        >
          My Work
        </h1>
      </motion.div>

      {/* Filter bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.6rem",
          marginBottom: "2.5rem",
        }}
      >
        {allTags.map((tag) => {
          const isActive = activeTag === tag;
          return (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              style={{
                padding: "6px 18px",
                borderRadius: 999,
                border: isActive
                  ? "1.5px solid var(--accent)"
                  : "1.5px solid var(--border)",
                background: isActive ? "var(--accent)" : "transparent",
                color: isActive ? "#fff" : "var(--text-muted)",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "inherit",
                letterSpacing: "0.03em",
                boxShadow: isActive ? "0 0 12px var(--accent)55" : "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.color = "var(--text)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text-muted)";
                }
              }}
            >
              {tag}
            </button>
          );
        })}
      </motion.div>

      {/* Projects grid */}
      <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            textAlign: "center",
            color: "var(--text-muted)",
            paddingTop: "4rem",
            fontSize: "1rem",
          }}
        >
          No projects in this category yet.
        </motion.p>
      )}
    </div>
  );
}