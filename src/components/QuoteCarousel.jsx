import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import steveJobsImg   from "../assets/steve-jobs.jpg";
import steveMartinImg from "../assets/steve-martin.jpg";
import oprahImg       from "../assets/opray-winfrey.jpg";

const quotes = [
  {
    id: 1,
    text: "You can't connect the dots looking forward; you can only connect them looking backwards. So you have to trust that the dots will somehow connect in your future.",
    person: "Steve Jobs",
    context: "Stanford Commencement, 2005",
    initials: "SJ",
    image: steveJobsImg, 
    accent: "#e040fb",
  },
  {
    id: 2,
    text: "Be so good they can't ignore you.",
    person: "Steve Martin",
    context: "Actor, Comedian",
    initials: "SM",
    image: steveMartinImg, 
    accent: "#00b4ff",
  },
  {
    id: 3,
    text: "Become so skilled, so vigilant, so flat-out fantastic at what you do, that your talent cannot be dismissed.",
    person: "Oprah Winfrey",
    context: "Media Executive & Philanthropist",
    initials: "OW",
    image: oprahImg, 
    accent: "#e040fb",
  },
];

const variants = {
  enter:  (d) => ({ opacity: 0, y: d > 0 ? 24 : -24 }),
  center: { opacity: 1, y: 0 },
  exit:   (d) => ({ opacity: 0, y: d > 0 ? -24 : 24 }),
};

export default function QuoteCarousel() {
  const [current,   setCurrent]   = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused,    setPaused]    = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setDirection(1);
      setCurrent(c => (c + 1) % quotes.length);
    }, 4500);
    return () => clearInterval(id);
  }, [paused]);

  const go = (next) => {
    setDirection(next > current ? 1 : -1);
    setCurrent(next);
  };

  const q = quotes[current];

  return (
    <motion.div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: "7rem" }}
    >

      <p style={{
        color: "var(--accent2)", letterSpacing: "0.18em",
        fontSize: "0.75rem", fontWeight: 700,
        marginBottom: "2.5rem", textTransform: "uppercase",
      }}>
        Words I live by
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: 440,
        alignItems: "stretch",
      }}>

        {/* ── Left: quote text ── */}
        <div style={{
          display: "flex", flexDirection: "column",
          justifyContent: "center", paddingRight: "3.5rem",
        }}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={q.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{
                fontSize: "6rem", lineHeight: 0.8,
                color: q.accent, fontFamily: "Georgia, serif",
                marginBottom: "1rem", opacity: 0.9,
                transition: "color 0.4s",
              }}>
                "
              </div>
              <p style={{
                fontSize: "clamp(1.2rem, 2.4vw, 1.6rem)",
                lineHeight: 1.75, color: "var(--text)",
                fontWeight: 400, marginBottom: "2rem",
                letterSpacing: "-0.01em",
              }}>
                {q.text}
              </p>
              <div>
                <p style={{ fontWeight: 700, fontSize: "1rem", color: q.accent, margin: 0 }}>
                  {q.person}
                </p>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                  {q.context}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots + arrows */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "2.5rem" }}>
            <button onClick={() => go((current - 1 + quotes.length) % quotes.length)}
              style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: "1rem", cursor: "pointer", padding: 0 }}>
              ←
            </button>
            {quotes.map((_, i) => (
              <button key={i} onClick={() => go(i)} style={{
                width: i === current ? 20 : 7, height: 7,
                borderRadius: 999,
                background: i === current ? q.accent : "var(--border)",
                border: "none", padding: 0, cursor: "pointer",
                transition: "all 0.35s ease",
                boxShadow: i === current ? `0 0 8px ${q.accent}99` : "none",
              }} />
            ))}
            <button onClick={() => go((current + 1) % quotes.length)}
              style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: "1rem", cursor: "pointer", padding: 0 }}>
              →
            </button>
          </div>
        </div>

        {/* ── Right: image or styled fallback ── */}
        <div style={{ position: "relative", overflow: "hidden", minHeight: 440 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={q.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ position: "absolute", inset: 0 }}
            >
              {q.image ? (
                <img
                  src={q.image}
                  alt={q.person}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", objectPosition: "top center",
                    filter: "grayscale(100%) contrast(1.08) brightness(0.92)",
                    display: "block",
                  }}
                />
              ) : (
                // Placeholder until images are added
                <div style={{
                  width: "100%", height: "100%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: `linear-gradient(160deg, ${q.accent}18, var(--bg-card))`,
                  fontSize: "7rem", fontWeight: 700,
                  color: q.accent, opacity: 0.25,
                  fontFamily: "Georgia, serif",
                }}>
                  {q.initials}
                </div>
              )}

              {/* Fade left edge into page bg */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to right, var(--bg) 0%, transparent 35%)",
                pointerEvents: "none",
              }} />

              {/* Accent strip on right edge */}
              <div style={{
                position: "absolute", top: 0, right: 0,
                width: 3, height: "100%",
                background: `linear-gradient(to bottom, ${q.accent}, transparent)`,
                transition: "background 0.4s",
              }} />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
}