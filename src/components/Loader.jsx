import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "compiling thoughts...",
  "brewing coffee...",
  "pushing to main...",
  "almost there...",
];

export default function Loader({ onComplete }) {
  const [progress, setProgress]   = useState(0);
  const [msgIndex, setMsgIndex]   = useState(0);
  const [done, setDone]           = useState(false);

  // Drive progress from 0 → 100 over ~2.4s with eased steps
  useEffect(() => {
    const steps = [
      { target: 30,  delay: 0,    duration: 500  },
      { target: 58,  delay: 500,  duration: 400  },
      { target: 75,  delay: 900,  duration: 300  },
      { target: 90,  delay: 1200, duration: 400  },
      { target: 100, delay: 1600, duration: 600  },
    ];

    const timers = steps.map(({ target, delay, duration }) =>
      setTimeout(() => {
        const start     = Date.now();
        const startVal  = progress;
        const tick = () => {
          const elapsed = Date.now() - start;
          const t       = Math.min(elapsed / duration, 1);
          // ease out cubic
          const eased   = 1 - Math.pow(1 - t, 3);
          setProgress(Math.round(startVal + (target - startVal) * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }, delay)
    );

    // Trigger exit after progress hits 100
    const exitTimer = setTimeout(() => setDone(true), 2600);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(exitTimer);
    };
  }, []);

  // Cycle through messages
  useEffect(() => {
    const id = setInterval(() => {
      setMsgIndex(i => (i + 1) % messages.length);
    }, 650);
    return () => clearInterval(id);
  }, []);

  // Tell parent we're done after exit animation
  useEffect(() => {
    if (done) {
      const t = setTimeout(onComplete, 700); // match exit duration
      return () => clearTimeout(t);
    }
  }, [done, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            background: "var(--bg)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2.5rem",
          }}
        >
          {/* Name */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
              fontWeight: 700,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--text)",
            }}
          >
            Sumedha Mandloi
          </motion.p>

          {/* Progress bar container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{ width: "min(400px, 70vw)" }}
          >
            {/* Track */}
            <div style={{
              width: "100%",
              height: 1.5,
              background: "var(--border)",
              borderRadius: 999,
              overflow: "hidden",
            }}>
              {/* Fill */}
              <motion.div
                style={{
                  height: "100%",
                  borderRadius: 999,
                  background: `linear-gradient(to right, var(--accent), var(--accent2))`,
                  boxShadow: "0 0 10px var(--accent)88",
                  width: `${progress}%`,
                  transition: "width 0.1s linear",
                }}
              />
            </div>

            {/* Percentage + message row */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "0.9rem",
            }}>
              {/* Cycling status message */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={msgIndex}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {messages[msgIndex]}
                </motion.span>
              </AnimatePresence>

              {/* Percentage */}
              <span style={{
                fontSize: "0.75rem",
                color: "var(--accent)",
                fontWeight: 600,
                letterSpacing: "0.05em",
                fontVariantNumeric: "tabular-nums",
              }}>
                {progress} %
              </span>
            </div>
          </motion.div>

          {/* Dot pulse at bottom — subtle life */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            style={{
              width: 6, height: 6,
              borderRadius: "50%",
              background: "var(--accent)",
              boxShadow: "0 0 10px var(--accent)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}