import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  {
    name: "Languages",
    icon: "{ }",
    skills: ["Python", "JavaScript", "TypeScript", "C", "C++"],
    x: 20, y: 8, baseSize: 170,
  },
  {
    name: "Web Dev",
    icon: "</>",
    skills: ["React", "Next.js", "Streamlit", "Django", "FastAPI", "Flask", "Tailwind", "Bootstrap"],
    x: 52, y: -10, baseSize: 190,
  },
  {
    name: "AI / ML",
    icon: "🤖",
    skills: ["NumPy", "Pandas", "Scikit-learn", "OpenCV", "Jupyter"],
    x: 40, y: 32, baseSize: 210,
  },
  {
    name: "Blockchain",
    icon: "⛓",
    skills: ["Solidity", "Web3.js", "Ethereum", "Blockchain Fundamentals"],
    x: 70, y: 20, baseSize: 180,
  },
  {
    name: "UI / UX",
    icon: "✦",
    skills: ["Figma", "Photoshop", "Canva"],
    x: 18, y: 70, baseSize: 200,
  },
  {
    name: "Tools",
    icon: "⚙",
    skills: ["Git", "GitHub", "Docker", "Linux", "VS Code", "Vercel"],
    x: 60, y: 60, baseSize: 180,
  },
];

const decorBubbles = [
  { x: 80, y: 8,  size: 80 },
  { x: 76, y: 50, size: 65 },
  { x: 38, y: 72, size: 55 },
  { x: 8,  y: 35, size: 50 },
];

const floatConfigs = [
  { dur: 6.2, delay: 0.0, dx: [-6,  5], dy: [-9,  7] },
  { dur: 5.1, delay: 0.7, dx: [ 4, -8], dy: [-7, 10] },
  { dur: 7.0, delay: 0.3, dx: [-5,  7], dy: [-10, 5] },
  { dur: 5.8, delay: 1.1, dx: [ 6, -4], dy: [-5,  9] },
  { dur: 6.5, delay: 0.5, dx: [-7,  4], dy: [-8,  6] },
  { dur: 5.5, delay: 0.9, dx: [ 5, -6], dy: [-9,  7] },
  { dur: 4.2, delay: 0.2, dx: [-4,  6], dy: [-6,  4] },
  { dur: 4.8, delay: 0.6, dx: [ 3, -5], dy: [-4,  7] },
  { dur: 5.3, delay: 1.3, dx: [-5,  3], dy: [-7,  5] },
  { dur: 3.9, delay: 0.4, dx: [ 4, -3], dy: [-5,  4] },
];

const expandTransition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1], // expo ease-out — fast start, smooth landing
};

function BubbleRim({ size, id }) {
  const rim = Math.max(1, Math.min(1.8, size * 0.009)); // very thin
  return (
    <svg
      style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }}
      width={size} height={size} viewBox={`0 0 ${size} ${size}`}
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#ff6eb4" />
          <stop offset="30%"  stopColor="#c77dff" />
          <stop offset="60%"  stopColor="#48cae4" />
          <stop offset="100%" stopColor="#ff6eb4" />
        </linearGradient>
      </defs>
      {/* whisper-thin outer glow */}
      <circle
        cx={size / 2} cy={size / 2} r={size / 2 - rim - 0.5}
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth={rim + 0.8}
        opacity={0.18}
      />
      {/* crisp rim */}
      <circle
        cx={size / 2} cy={size / 2} r={size / 2 - rim / 2}
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth={rim}
        opacity={0.9}
      />
    </svg>
  );
}

function BubbleVisuals({ size }) {
  return (
    <>
      {/* glassy transparent body */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        background: `radial-gradient(circle at 38% 35%,
          rgba(255,255,255,0.10) 0%,
          rgba(200,180,255,0.05) 45%,
          rgba(80,60,180,0.08) 75%,
          rgba(20,10,60,0.20) 100%)`,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }} />
      {/* specular crescent */}
      <div style={{
        position: "absolute", top: "8%", left: "10%",
        width: "42%", height: "28%", borderRadius: "50%",
        background: `radial-gradient(ellipse at 40% 40%,
          rgba(255,255,255,0.60) 0%,
          rgba(255,255,255,0.12) 50%,
          transparent 70%)`,
        transform: "rotate(-25deg)", pointerEvents: "none",
        opacity: 0.3,
      }} />
      {/* bright dot */}
      <div style={{
        position: "absolute", top: "13%", left: "19%",
        width: "12%", height: "10%", borderRadius: "50%",
        background: "rgba(255,255,255,0.75)",
        filter: "blur(2px)", pointerEvents: "none",
      }} />
      {/* depth shadow bottom-right */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        background: `radial-gradient(circle at 68% 72%, rgba(10,0,40,0.22) 0%, transparent 55%)`,
        pointerEvents: "none",
      }} />
    </>
  );
}

function CategoryBubble({ cat, index, activeIndex, onHover, onLeave }) {
  const fc        = floatConfigs[index];
  const isActive  = activeIndex === index;
  const isIdle    = activeIndex !== null && !isActive;
  const expanded  = Math.max(260, cat.skills.length * 32 + 80);
  const base      = cat.baseSize;

  return (
    <motion.div
      // Float drift — pause drift while active so expansion feels stable
      animate={{
        x:       isActive ? 0 : fc.dx,
        y:       isActive ? 0 : fc.dy,
        opacity: isIdle ? 0.5 : 1,
        scale:   isIdle ? 0.86 : 1,
      }}
      transition={{
        x:       { duration: fc.dur * 1.3, repeat: isActive ? 0 : Infinity, repeatType: "mirror", ease: "easeInOut", delay: fc.delay },
        y:       { duration: fc.dur,       repeat: isActive ? 0 : Infinity, repeatType: "mirror", ease: "easeInOut", delay: fc.delay + 0.5 },
        opacity: { duration: 0.3 },
        scale:   { duration: 0.3 },
      }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      style={{
        position: "absolute",
        // Place the CENTRE of the bubble at these coords
        left: `${cat.x}%`,
        top:  `${cat.y}%`,
        zIndex: isActive ? 10 : 1,
      }}
    >
      
      <motion.div
        animate={{ scale: isActive ? 1 : base / expanded }}
        transition={expandTransition}
        style={{
          width:  expanded,
          height: expanded,
          borderRadius: "50%",
          overflow: "hidden",
          // Centre the fixed-size div on the position point
          marginLeft: -expanded / 2,
          marginTop:  -expanded / 2,
          position: "relative",
          transformOrigin: "center center", // explicit — grows from middle
        }}
      >
        <BubbleVisuals size={expanded} />
        <BubbleRim size={expanded} id={`rim-${index}`} />

        {/* Content */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "1.8rem", gap: "0.5rem", zIndex: 2,
        }}>
          <AnimatePresence mode="wait">
            {!isActive ? (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ textAlign: "center" }}
              >
                <div style={{ fontSize: "1.6rem", marginBottom: 6 }}>{cat.icon}</div>
                <span style={{
                  fontWeight: 700, fontSize: "1.7rem",
                  color: "rgba(255,255,255,0.92)",
                  letterSpacing: "0.03em",
                  textShadow: "0 1px 8px rgba(80,40,180,0.8)",
                }}>{cat.name}</span>
              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.25 }}
                style={{ textAlign: "center", width: "100%" }}
              >
                <p style={{
                  fontWeight: 700, fontSize: "1rem",
                  color: "rgba(255,255,255,0.95)",
                  marginBottom: "0.75rem",
                  letterSpacing: "0.05em",
                  textShadow: "0 0 14px rgba(180,100,255,0.8)",
                  textTransform: "uppercase",
                }}>{cat.name}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", justifyContent: "center" }}>
                  {cat.skills.map((skill, si) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.75 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.18, delay: si * 0.045 }}
                      style={{
                        fontSize: "0.72rem", fontWeight: 600,
                        padding: "3px 10px", borderRadius: 999,
                        background: "rgba(255,255,255,0.12)",
                        border: "1px solid rgba(180,120,255,0.5)",
                        color: "rgba(255,255,255,0.9)",
                        letterSpacing: "0.02em",
                        backdropFilter: "blur(4px)",
                        textShadow: "0 0 8px rgba(150,100,255,0.5)",
                        whiteSpace: "nowrap",
                      }}
                    >{skill}</motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DecorBubble({ b, index }) {
  const fc = floatConfigs[6 + index];
  return (
    <motion.div
      animate={{ x: fc.dx, y: fc.dy }}
      transition={{
        x: { duration: fc.dur * 1.4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: fc.delay },
        y: { duration: fc.dur,       repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: fc.delay + 0.6 },
      }}
      style={{
        position: "absolute",
        left: `${b.x}%`, top: `${b.y}%`,
        width: b.size, height: b.size,
        borderRadius: "50%", overflow: "hidden",
        marginLeft: -b.size / 2, marginTop: -b.size / 2,
      }}
    >
      <BubbleVisuals size={b.size} />
      <BubbleRim size={b.size} id={`decor-${index}`} />
    </motion.div>
  );
}

function AmbientBlob({ top, left, color, size, duration, delay = 0 }) {
  return (
    <motion.div
      animate={{ x: [0, 30, -18, 8, 0], y: [0, -22, 14, -8, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
      style={{
        position: "absolute", top, left,
        width: size, height: size, borderRadius: "50%",
        background: color, filter: "blur(80px)", opacity: 0.15,
        zIndex: 0, pointerEvents: "none",
      }}
    />
  );
}

export default function Skills() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div style={{ position: "relative", minHeight: "90vh", overflow: "hidden", padding: "4rem 2rem 6rem" }}>

      <AmbientBlob top="-5%"  left="5%"  color="linear-gradient(135deg,#e040fb,#7b2ff7)" size={350} duration={18} />
      <AmbientBlob top="50%"  left="60%" color="linear-gradient(135deg,#00b4ff,#0070cc)" size={300} duration={22} delay={3} />
      <AmbientBlob top="60%"  left="10%" color="linear-gradient(135deg,#c77dff,#48cae4)" size={250} duration={15} delay={6} />
      <AmbientBlob top="15%"  left="72%" color="linear-gradient(135deg,#ff6eb4,#c77dff)" size={200} duration={20} delay={1} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto" }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ marginBottom: "2rem" }}
        >
          <p style={{ color: "var(--accent2)", letterSpacing: "0.2em", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.5rem", textTransform: "uppercase" }}>
            What I work with
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "var(--text)" }}>
            Skills
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 1.2, duration: 0.8 }}
          style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "1rem", letterSpacing: "0.05em" }}
        >
          hover a bubble to explore
        </motion.p>

        <div style={{ position: "relative", height: "58vh", minHeight: 440 }}>
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.34, 1.4, 0.64, 1] }}
              style={{ position: "absolute", left: `${cat.x}%`, top: `${cat.y}%` }}
            >
              <CategoryBubble
                cat={cat} index={i}
                activeIndex={activeIndex}
                onHover={() => setActiveIndex(i)}
                onLeave={() => setActiveIndex(null)}
              />
            </motion.div>
          ))}

          {decorBubbles.map((b, i) => (
            <DecorBubble key={i} b={b} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}