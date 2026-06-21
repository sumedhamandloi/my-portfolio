import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const blobs = [
  { top: "10%", left: "5%", size: 280, color: "#c084fc", duration: 18 },
  { top: "60%", left: "80%", size: 220, color: "#818cf8", duration: 22 },
  { top: "80%", left: "15%", size: 180, color: "#e040fb", duration: 15 },
  { top: "30%", left: "90%", size: 150, color: "#c084fc", duration: 20 },
];

export default function AmbientBackground() {
  const { pathname } = useLocation();
  if (pathname === "/skills") return null;
  return (
    <div style={{
      position: "fixed", inset: 0,
      pointerEvents: "none", zIndex: 0,
      overflow: "hidden",
    }}>
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          animate={{ x: [0, 30, -20, 0], y: [0, -25, 15, 0] }}
          transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
          style={{
            position: "absolute",
            top: b.top, left: b.left,
            width: b.size, height: b.size,
            borderRadius: "50%",
            background: b.color,
            filter: "blur(90px)",
            opacity: 0.2,
          }}
        />
      ))}
    </div>
  );
}