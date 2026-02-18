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
    <nav style={{ display: "flex", gap: "1.5rem", padding: "1rem 2rem" }}>
      {links.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          end
          style={({ isActive }) => ({
            fontWeight: isActive ? "700" : "400",
            textDecoration: "none",
          })}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}