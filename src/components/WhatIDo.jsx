import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const cards = [
  {
    tag: "Currently",
    title: "Student",
    subtitle: "Constant learner, always building",
    description:
      "IT undergrad at IIPS, DAVV - graduating 2029. I treat every semester as a sprint: pick up a new skill, ship something real, reflect, repeat. From DSA to system design, building the fundamentals that make everything else possible.",
    bg: "#e040fb",
    number: "01",
  },
  {
    tag: "Design & Dev",
    title: "UI/UX & Frontend",
    subtitle: "Making interfaces that feel inevitable",
    description:
      "I design in Figma and build in React. My obsession is the gap between a UI that works and one that delights — the typography, the spacing, the moment a user doesn't have to think. Every pixel is a decision.",
    bg: "#00b4ff",
    number: "02",
  },
  {
    tag: "Learning",
    title: "AI / ML",
    subtitle: "Teaching machines, learning from them",
    description:
      "Building with TensorFlow, PyTorch, and learning more with a lot of curiosity. Drawn to AI that solves real problems for real people.",
    bg: "#e040fb",
    number: "03",
  },
  {
    tag: "Creating",
    title: "Content & Social",
    subtitle: "Ideas worth sharing, clearly",
    description:
      "I handle social media handles and document progress as tech is only as good as people who document it.",
    bg: "#00c896",
    number: "04",
  },
];

export default function WhatIDo() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(cards.length - 1) * 100}vw`]
  );

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      style={{
        height: `${cards.length * 100}vh`,
        position: "relative",
        // KEY FIX: no overflow:hidden here — it breaks sticky
      }}
    >
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        // KEY FIX: overflow visible so cards aren't clipped
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}>

        {/* Progress bar */}
        <motion.div style={{
          position: "absolute",
          top: 0, left: 0,
          height: 2,
          background: "var(--accent)",
          boxShadow: "0 0 8px var(--accent)",
          width: progressWidth,
          zIndex: 10,
        }} />

        {/* Scroll hint */}
        <motion.p style={{
          position: "absolute",
          top: "1.5rem", right: "2rem",
          fontSize: "0.75rem",
          color: "var(--text-muted)",
          letterSpacing: "0.1em",
          zIndex: 10,
          opacity: useTransform(scrollYProgress, [0, 0.05], [0, 1]),
        }}>
          scroll ↓
        </motion.p>

        {/* Section label */}
        <p style={{
          position: "absolute",
          top: "1.5rem", left: "2rem",
          fontSize: "0.75rem", fontWeight: 700,
          color: "var(--accent2)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          zIndex: 10,
        }}>
          What I Do
        </p>

        {/* Horizontal strip */}
        <motion.div
          style={{
            display: "flex",
            x,
            width: `${cards.length * 100}vw`,
            willChange: "transform",
          }}
        >
          {cards.map((card, i) => (
            <div
              key={card.title}
              style={{
                width: "90vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                padding: "2rem",
              }}
            >
              <div style={{
                width: "min(520px, 85vw)",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 24,
                padding: "3rem",
                position: "relative",
                overflow: "hidden",
              }}>
                {/* Faded number */}
                <div style={{
                  position: "absolute",
                  top: "-0.5rem", right: "1.5rem",
                  fontSize: "8rem", fontWeight: 900,
                  color: card.bg, opacity: 0.07,
                  lineHeight: 1, userSelect: "none", pointerEvents: "none",
                }}>
                  {card.number}
                </div>

                {/* Accent top bar */}
                <div style={{
                  position: "absolute",
                  top: 0, left: 0,
                  width: "100%", height: 3,
                  background: `linear-gradient(to right, ${card.bg}, transparent)`,
                  borderRadius: "24px 24px 0 0",
                }} />

                {/* Tag */}
                <span style={{
                  display: "inline-block",
                  fontSize: "0.7rem", fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: card.bg,
                  background: `${card.bg}18`,
                  border: `1px solid ${card.bg}55`,
                  padding: "4px 14px", borderRadius: 999,
                  marginBottom: "1.4rem",
                }}>
                  {card.tag}
                </span>

                {/* Title */}
                <h2 style={{
                  fontSize: "clamp(2rem, 4vw, 2.8rem)",
                  fontWeight: 800, color: "var(--text)",
                  lineHeight: 1.05, marginBottom: "0.5rem",
                  letterSpacing: "-0.02em",
                }}>
                  {card.title}
                </h2>

                {/* Subtitle */}
                <p style={{
                  fontSize: "0.95rem", color: card.bg,
                  fontWeight: 500, marginBottom: "1.4rem",
                }}>
                  {card.subtitle}
                </p>

                {/* Description */}
                <p style={{
                  fontSize: "1rem", color: "var(--text-muted)",
                  lineHeight: 1.85, margin: 0,
                }}>
                  {card.description}
                </p>

                {/* Progress dots */}
                <div style={{ display: "flex", gap: "0.4rem", marginTop: "2rem" }}>
                  {cards.map((_, di) => (
                    <div key={di} style={{
                      width: di === i ? 20 : 6,
                      height: 6, borderRadius: 999,
                      background: di === i ? card.bg : "var(--border)",
                    }} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}