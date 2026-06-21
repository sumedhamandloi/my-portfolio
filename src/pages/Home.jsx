import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import QuoteCarousel from "../components/QuoteCarousel.jsx";

import myPhoto from "../assets/sumedha-mandloi.jpg";

const roles = ["UI/UX Designer", "AI Enthusiast", "Web Developer", "Problem Solver"];

const featuredProjects = [
  {
    title: "KrishiMitra",
    tag: "AI/ML",
    desc: "Bilingual AI agent for farmers — Top 8 at IBM SkillsBuild.",
    image: null,
    accent: "#00c896",
  },
  {
    title: "Edufolio",
    tag: "SIH",
    desc: "Student achievement platform built for Smart India Hackathon.",
    image: null,
    accent: "#e040fb",
  },
  {
    title: "Capscout",
    tag: "Concept",
    desc: "AI-powered investor-startup matchmaking platform.",
    image: null,
    accent: "#00b4ff",
  },
];

// ─── Typewriter ───────────────────────────────────────────────────────────────
function Typewriter({ words }) {
  const [index, setIndex]         = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting]   = useState(false);

  useEffect(() => {
    const word = words[index];
    let timeout;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else {
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

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ p, i }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ transform: hovered ? "translateY(-6px)" : "translateY(0)", transition: "transform 0.25s ease" }}
    >
      <Link to="/projects" style={{ textDecoration: "none" }}>
        <div style={{
          background: "var(--bg-card)",
          border: `1px solid ${hovered ? p.accent : "var(--border)"}`,
          borderRadius: 16, overflow: "hidden",
          transition: "border-color 0.25s",
          boxShadow: hovered ? `0 8px 32px ${p.accent}22` : "none",
        }}>
          <div style={{
            width: "100%", height: 150,
            overflow: "hidden", position: "relative",
          }}>
            {p.image ? (
              <img src={p.image} alt={p.title} style={{
                width: "100%", height: "100%", objectFit: "cover",
                opacity: hovered ? 1 : 0.85,
                transform: hovered ? "scale(1.05)" : "scale(1)",
                transition: "opacity 0.3s, transform 0.4s",
              }} />
            ) : (
              <div style={{
                width: "100%", height: "100%",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: `linear-gradient(135deg, ${p.accent}18, var(--bg-card))`,
              }}>
                <span style={{ fontSize: "2rem", opacity: 0.25 }}>◈</span>
              </div>
            )}
            <span style={{
              position: "absolute", top: 10, left: 10,
              fontSize: "0.68rem", letterSpacing: "0.08em",
              color: p.accent, background: "rgba(0,0,0,0.55)",
              padding: "3px 10px", borderRadius: 20,
              border: `1px solid ${p.accent}88`,
              backdropFilter: "blur(4px)", fontWeight: 700,
            }}>
              {p.tag}
            </span>
          </div>
          <div style={{ padding: "1.1rem 1.3rem 1.3rem" }}>
            <h4 style={{ margin: "0 0 0.35rem", fontSize: "1rem", color: "var(--text)", fontWeight: 700 }}>
              {p.title}
            </h4>
            <p style={{ color: "var(--text-muted)", fontSize: "0.87rem", lineHeight: 1.6, margin: 0 }}>
              {p.desc}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
function Section({ label, children, style = {} }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginBottom: "7rem", ...style }}
    >
      {label && (
        <p style={{
          color: "var(--accent2)", letterSpacing: "0.18em",
          fontSize: "0.75rem", fontWeight: 700,
          marginBottom: "1.4rem", textTransform: "uppercase",
        }}>
          {label}
        </p>
      )}
      {children}
    </motion.section>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "5rem 2rem 4rem" }}>

      {/* ── Hero ── */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          marginBottom: "8rem",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "3rem",
          alignItems: "center",
        }}
      >
        <div>
          <p style={{ color: "var(--accent2)", marginBottom: "0.6rem", letterSpacing: "0.18em", fontSize: "0.75rem", fontWeight: 700 }}>
            HELLO, I'M
          </p>
          <h1 style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)", fontWeight: 700, lineHeight: 1.05, marginBottom: "1rem" }}>
            Sumedha<br />Mandloi
          </h1>
          <h2 style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)", fontWeight: 400, marginBottom: "1.8rem", color: "var(--text-muted)", minHeight: "2rem" }}>
            <Typewriter words={roles} />
          </h2>
          <p style={{ maxWidth: 480, lineHeight: 1.9, color: "var(--text-muted)", marginBottom: "2.5rem", fontSize: "1rem" }}>
            IT undergrad at IIPS, DAVV, Indore. Always building something new —
            whether it's an ML model or a clean UI. Let's talk tech over coffee.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link to="/projects">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{
                  padding: "0.75rem 1.8rem", background: "transparent",
                  border: "1.5px solid var(--accent)", color: "var(--accent)",
                  borderRadius: 8, fontSize: "0.95rem", cursor: "pointer",
                  fontWeight: 600, letterSpacing: "0.04em", fontFamily: "inherit",
                }}>
                See My Work →
              </motion.button>
            </Link>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{
                  padding: "0.75rem 1.8rem", background: "var(--accent)",
                  border: "1.5px solid var(--accent)", color: "#fff",
                  borderRadius: 8, fontSize: "0.95rem", cursor: "pointer",
                  fontWeight: 600, letterSpacing: "0.04em", fontFamily: "inherit",
                  boxShadow: "0 0 20px var(--accent)44",
                }}>
                Resume ↓
              </motion.button>
            </a>
          </div>
        </div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div style={{
            width: 350, height: 500,
            borderRadius: 24,
            border: "2px solid var(--accent)",
            boxShadow: "0 0 40px var(--accent)33",
            overflow: "hidden",
            background: "linear-gradient(135deg, var(--accent)22, var(--bg-card))",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "4rem", color: "var(--accent)", userSelect: "none",
          }}>
            
            <img src={myPhoto} style={{width:"100%",height:"100%",objectFit:"cover"}} />
          </div>
        </motion.div>
      </motion.section>

      {/* ── Origin Story ── */}
      <Section label="How I got here">
        <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, marginBottom: "1.8rem", lineHeight: 1.2 }}>
          A font story changed<br />everything.
        </h2>
        <div style={{ maxWidth: 620, color: "var(--text-muted)", lineHeight: 2, fontSize: "1rem", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <p>Before I knew what UI/UX was, I stumbled on Steve Jobs' Stanford speech. He talked about dropping into a calligraphy class after dropping out of Reed College — with no practical application in sight. He just thought it was beautiful. Ten years later, every one of those letterforms showed up in the Macintosh.</p>
          <p>That was the moment I stopped thinking about tech as just logic and started seeing it as craft. Design wasn't decoration — it was the difference between something people use and something people <em style={{ color: "var(--text)" }}>love</em>.</p>
          <p>I didn't know it then, but that was my dot. KrishiMitra, Edufolio, Capscout — each one connected back to that moment of realizing that the best technology doesn't just function, it <em style={{ color: "var(--text)" }}>feels</em>.</p>
        </div>
      </Section>

      {/* ── Quotes — handled entirely by QuoteCarousel component ── */}
      <QuoteCarousel />

      {/* ── About ── */}
      <Section label="About">
        <p style={{ fontSize: "1.1rem", lineHeight: 2, maxWidth: 620, color: "var(--text-muted)" }}>
          I believe in making impact and solving problems efficiently — leveraging
          development skills, design thinking, and a genuine curiosity for AI.
          Always up for a new project or a conversation about tech.
        </p>
      </Section>

      {/* ── Featured Projects ── */}
      <Section label="Featured Projects">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.4rem" }}>
          {featuredProjects.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
        </div>
        <div style={{ marginTop: "1.8rem" }}>
          <Link to="/projects">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              style={{
                padding: "0.65rem 1.6rem", background: "transparent",
                border: "1px solid var(--border)", color: "var(--text-muted)",
                borderRadius: 8, fontSize: "0.88rem",
                cursor: "pointer", fontFamily: "inherit",
              }}>
              View all projects →
            </motion.button>
          </Link>
        </div>
      </Section>

      {/* ── Theme toggle ── */}
      <motion.button
        onClick={() => {
          const b = document.body;
          b.classList.contains("theme-dark")
            ? b.classList.replace("theme-dark", "theme-light")
            : b.classList.replace("theme-light", "theme-dark");
        }}
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        style={{
          position: "fixed", bottom: "5.5rem", right: "2rem",
          width: 44, height: 44, borderRadius: "50%",
          background: "var(--bg-card)", border: "1px solid var(--border)",
          fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)", cursor: "pointer", zIndex: 100,
        }}>
        🌙
      </motion.button>

    </div>
  );
}