import { NavLink } from "react-router-dom";

const links = [
  { to: "/", icon: "ti-home", label: "Home" },
  { to: "/projects", icon: "ti-briefcase", label: "Projects" },
  { to: "/skills", icon: "ti-bulb", label: "Skills" },
  { to: "/blogs", icon: "ti-pencil", label: "Blogs" },
  { to: "/contact", icon: "ti-mail", label: "Contact" },
];

export default function Navbar() {
  return (
    <nav style={{
      position: "fixed",
      bottom: "2rem",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      gap: "4px",
      padding: "10px 16px",
      background: "var(--glass-bg)",
      border: "1px solid var(--border)",
      borderRadius: 40,
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
    }}>
      {links.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: 0,
            padding: "8px 12px",
            borderRadius: 28,
            textDecoration: "none",
            background: isActive ? "var(--bg-card)" : "transparent",
            transition: "background 0.2s",
          })}
          className="nav-item"
        >
          {({ isActive }) => (
            <>
              <i
                className={`ti ${icon}`}
                aria-hidden="true"
                style={{
                  fontSize: 18,
                  color: isActive ? "var(--accent)" : "var(--text-muted)",
                  flexShrink: 0,
                  transition: "color 0.2s",
                }}
              />
              <span className="nav-label" style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--accent)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                maxWidth: 0,
                opacity: 0,
                marginLeft: 0,
                transition: "max-width 0.3s ease, opacity 0.25s ease, margin-left 0.3s ease",
              }}>
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}