import { useEffect, useState } from "react";

export default function GlowCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailing, setTrailing] = useState({ x: -100, y: -100 });
  const [overNav, setOverNav] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    let frame;
    const animate = () => {
      setTrailing(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.12,
        y: prev.y + (pos.y - prev.y) * 0.12,
      }));
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [pos]);

  useEffect(() => {
    const handleOver = (e) => {
      const nav = e.target.closest("nav");
      setOverNav(!!nav);
    };
    window.addEventListener("mouseover", handleOver);
    return () => window.removeEventListener("mouseover", handleOver);
  }, []);

  if (overNav) return null;

  return (
    <>
      <div style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: "#c084fc",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 9999,
        boxShadow: "0 0 8px 2px #c084fc",
      }} />
      <div style={{
        position: "fixed",
        left: trailing.x,
        top: trailing.y,
        width: 32,
        height: 32,
        borderRadius: "50%",
        border: "1.5px solid #c084fc88",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 9998,
        boxShadow: "0 0 16px 4px #c084fc33",
      }} />
    </>
  );
}