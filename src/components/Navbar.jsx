import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
  { to: "/blogs", label: "Blogs" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <nav style={{
      display: "flex", gap: "2rem",
      padding: "1.2rem 2rem",
      borderBottom: "1px solid var(--border)",
      background: "var(--bg)",
      position: "sticky", top: 0, zIndex: 100,
      backdropFilter: "blur(10px)"
    }}>
      {links.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          end
          style={({ isActive }) => ({
            fontWeight: isActive ? "700" : "400",
            color: isActive ? "var(--accent)" : "var(--text-muted)",
            fontSize: "0.95rem",
            letterSpacing: 0.5,
            transition: "color 0.2s"
          })}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}