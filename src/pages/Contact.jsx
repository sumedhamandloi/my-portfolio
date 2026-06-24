import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FORMSPREE_ID = "xdarakbq";

const socials = [
  { label: "GitHub", icon: "ti-brand-github", url: "https://github.com/sumedhamandloi" },
  { label: "LinkedIn", icon: "ti-brand-linkedin", url: "https://linkedin.com/in/sumedhamandloi" },
  { label: "Instagram", icon: "ti-brand-instagram", url: "https://instagram.com/sumedhamandloi" },
];

// ─── Bug Hunt ─────────────────────────────────────────────────────────────────
// hasBug: true  → "Found it!" is correct
// hasBug: false → "Looks fine" is correct
const snippets = [
  {
    id: 1,
    label: "Off-by-one loop",
    code: `for (let i = 0; i <= arr.length; i++) {\n  console.log(arr[i]);\n}`,
    hasBug: true,
    hint: "Array index goes out of bounds on the last iteration",
    fix: "<= should be <",
  },
  {
    id: 2,
    label: "Equality check",
    code: `if (userInput === "admin") {\n  grantAccess();\n}`,
    hasBug: false,
    hint: "Triple equals is the correct comparison operator",
    fix: "Nothing to fix — this is correct!",
  },
  {
    id: 3,
    label: "Async without await",
    code: `async function getData() {\n  const res = fetch("/api/data");\n  return res.json();\n}`,
    hasBug: true,
    hint: "fetch returns a Promise — you need to await it",
    fix: "Add await before fetch(...) and before res.json()",
  },
  {
    id: 4,
    label: "State update",
    code: `const [items, setItems] = useState([]);\n\nsetItems([...items, newItem]);`,
    hasBug: false,
    hint: "Spreading into a new array is the correct immutable pattern",
    fix: "Nothing to fix — this is correct!",
  },
  {
    id: 5,
    label: "Missing dependency",
    code: `useEffect(() => {\n  fetchUser(userId);\n}, []); // should re-run when userId changes`,
    hasBug: true,
    hint: "The effect uses userId but the dep array is empty",
    fix: "Add userId to the dependency array: [userId]",
  },
  {
    id: 6,
    label: "Mutating state directly",
    code: `const [items, setItems] = useState([]);\n\nitems.push(newItem);\nsetItems(items);`,
    hasBug: true,
    hint: "React state must never be mutated directly",
    fix: "setItems([...items, newItem])",
  },
  {
    id: 7,
    label: "Promise chain",
    code: `fetch("/api/user")\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));`,
    hasBug: false,
    hint: "Proper .then() chaining with .catch() error handling",
    fix: "Nothing to fix — this is correct!",
  },
];

// Pick 5 random snippets each game — mix of buggy and clean
function getRandomSnippets() {
  return [...snippets].sort(() => Math.random() - 0.5).slice(0, 5);
}

function BugHunt() {
  const [rounds, setRounds]     = useState(() => getRandomSnippets());
  const [current, setCurrent]   = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore]       = useState(0);
  const [done, setDone]         = useState(false);
  const [selected, setSelected] = useState(null); // true = said "found it", false = said "looks fine"

  const snippet = rounds[current];

  const handleAnswer = (saidBuggy) => {
    setSelected(saidBuggy);
    setRevealed(true);
    // Correct if: said buggy AND has bug, OR said fine AND no bug
    const correct = saidBuggy === snippet.hasBug;
    if (correct) setScore(s => s + 1);
  };

  const next = () => {
    setRevealed(false);
    setSelected(null);
    if (current + 1 >= rounds.length) {
      setDone(true);
    } else {
      setCurrent(c => c + 1);
    }
  };

  const reset = () => {
    setRounds(getRandomSnippets()); // new random set each game
    setCurrent(0);
    setScore(0);
    setRevealed(false);
    setSelected(null);
    setDone(false);
  };

  const wasCorrect = selected !== null && selected === snippet.hasBug;

  if (done) return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ textAlign: "center", padding: "2rem" }}
    >
      <p style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
        {score === rounds.length ? "🏆" : score >= 3 ? "🎯" : "🐛"}
      </p>
      <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--text)" }}>
        {score} / {rounds.length} correct
      </h3>
      <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
        {score === rounds.length
          ? "Perfect! You'd pass any code review."
          : score >= 3
          ? "Solid debugging skills."
          : "Keep practicing — bugs are sneaky."}
      </p>
      <button onClick={reset} style={{
        padding: "0.6rem 1.6rem", borderRadius: 8,
        border: "1.5px solid var(--accent)", background: "transparent",
        color: "var(--accent)", fontWeight: 600, fontSize: "0.9rem",
        cursor: "pointer", fontFamily: "inherit",
      }}>
        Play Again
      </button>
    </motion.div>
  );

  return (
    <div>
      {/* Progress row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem" }}>
        <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", letterSpacing: 1 }}>
          {current + 1} / {rounds.length}
        </span>
        <span style={{ fontSize: "0.78rem", color: "var(--accent)", fontWeight: 700 }}>
          Score: {score}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: "var(--border)", borderRadius: 99, marginBottom: "1.4rem" }}>
        <motion.div
          animate={{ width: `${(current / rounds.length) * 100}%` }}
          transition={{ duration: 0.4 }}
          style={{ height: "100%", background: "var(--accent)", borderRadius: 99 }}
        />
      </div>

      {/* Label */}
      <p style={{ fontSize: "0.78rem", color: "var(--accent2)", letterSpacing: 2, marginBottom: "0.5rem", fontWeight: 600 }}>
        {snippet.label.toUpperCase()}
      </p>

      {/* Code */}
      <pre style={{
        background: "var(--bg)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        padding: "1.2rem",
        fontSize: "0.82rem",
        lineHeight: 1.8,
        fontFamily: "'Fira Code', 'Courier New', monospace",
        color: "var(--text)",
        overflowX: "auto",
        marginBottom: "1.2rem",
        whiteSpace: "pre-wrap",
      }}>
        {snippet.code}
      </pre>

      <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginBottom: "1rem" }}>
        Does this code have a bug?
      </p>

      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="buttons"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: "flex", gap: "0.8rem" }}
          >
            <button
              onClick={() => handleAnswer(true)}
              style={{
                flex: 1, padding: "0.65rem", borderRadius: 8,
                border: "1.5px solid #00c896",
                background: "transparent", color: "#00c896",
                fontWeight: 600, fontSize: "0.88rem",
                cursor: "pointer", fontFamily: "inherit",
              }}
            >
              🐛 Has a bug
            </button>
            <button
              onClick={() => handleAnswer(false)}
              style={{
                flex: 1, padding: "0.65rem", borderRadius: 8,
                border: "1.5px solid var(--border)",
                background: "transparent", color: "var(--text-muted)",
                fontWeight: 600, fontSize: "0.88rem",
                cursor: "pointer", fontFamily: "inherit",
              }}
            >
              ✓ Looks fine
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div style={{
              padding: "1rem 1.2rem", borderRadius: 10, marginBottom: "1rem",
              background: wasCorrect ? "#00c89618" : "#ff404018",
              border: `1px solid ${wasCorrect ? "#00c896" : "#ff4040"}`,
            }}>
              <p style={{ fontWeight: 700, color: wasCorrect ? "#00c896" : "#ff4040", margin: "0 0 0.4rem", fontSize: "0.88rem" }}>
                {wasCorrect ? "✓ Correct!" : "✗ Not quite"}
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", margin: "0 0 0.3rem" }}>
                <strong style={{ color: "var(--text)" }}>
                  {snippet.hasBug ? "Bug found:" : "No bug here:"}
                </strong>{" "}
                {snippet.hint}
              </p>
              <p style={{ color: "var(--accent)", fontSize: "0.82rem", margin: 0, fontFamily: "monospace" }}>
                {snippet.fix}
              </p>
            </div>
            <button
              onClick={next}
              style={{
                width: "100%", padding: "0.65rem", borderRadius: 8,
                border: "none", background: "var(--accent)", color: "#fff",
                fontWeight: 600, fontSize: "0.88rem",
                cursor: "pointer", fontFamily: "inherit",
              }}
            >
              {current + 1 < rounds.length ? "Next →" : "See Results"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Contact Form ──────────────────────────────────────────────────────────────
function ContactForm() {
  const [form,   setForm]   = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    width: "100%", padding: "0.7rem 0.9rem",
    background: "var(--bg)", border: "1px solid var(--border)",
    borderRadius: 8, color: "var(--text)",
    fontSize: "0.95rem", fontFamily: "inherit",
    outline: "none", transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  if (status === "sent") return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      style={{ textAlign: "center", padding: "3rem 1rem" }}
    >
      <p style={{ fontSize: "2rem", marginBottom: "1rem" }}>✉️</p>
      <h3 style={{ fontWeight: 700, marginBottom: "0.5rem", color: "var(--text)" }}>Message sent!</h3>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>I'll get back to you soon.</p>
    </motion.div>
  );

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: 1, display: "block", marginBottom: "0.4rem" }}>NAME</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required style={inputStyle}
            onFocus={e => e.target.style.borderColor = "var(--accent)"}
            onBlur={e  => e.target.style.borderColor = "var(--border)"} />
        </div>
        <div>
          <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: 1, display: "block", marginBottom: "0.4rem" }}>EMAIL</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required style={inputStyle}
            onFocus={e => e.target.style.borderColor = "var(--accent)"}
            onBlur={e  => e.target.style.borderColor = "var(--border)"} />
        </div>
      </div>
      <div>
        <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: 1, display: "block", marginBottom: "0.4rem" }}>MESSAGE</label>
        <textarea name="message" value={form.message} onChange={handleChange}
          placeholder="What's on your mind?" required rows={5}
          style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
          onFocus={e => e.target.style.borderColor = "var(--accent)"}
          onBlur={e  => e.target.style.borderColor = "var(--border)"} />
      </div>
      <motion.button type="submit" disabled={status === "sending"}
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        style={{
          padding: "0.8rem", background: "var(--accent)", border: "none",
          borderRadius: 8, color: "#fff", fontWeight: 700, fontSize: "0.95rem",
          cursor: "pointer", fontFamily: "inherit",
          boxShadow: "0 0 20px var(--accent)44",
          opacity: status === "sending" ? 0.7 : 1,
        }}>
        {status === "sending" ? "Sending..." : "Send Message →"}
      </motion.button>
      {status === "error" && (
        <p style={{ color: "#ff4040", fontSize: "0.85rem", textAlign: "center" }}>
          Something went wrong. Try emailing me directly.
        </p>
      )}
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Contact() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "4rem 2rem 6rem" }}>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        style={{ marginBottom: "4rem" }}
      >
        <p style={{ color: "var(--accent2)", letterSpacing: 2, fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.5rem" }}>
          LET'S TALK
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, marginBottom: "1rem" }}>
          Get in Touch
        </h1>
        <p style={{ color: "var(--text-muted)", maxWidth: 480, lineHeight: 1.8, fontSize: "1rem" }}>
          Whether it's a project, an internship opportunity, or just a conversation
          about tech over coffee — my inbox is open.
        </p>
      </motion.div>

      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "3rem", alignItems: "start", marginBottom: "5rem",
      }}>

        {/* Left — form + socials */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ContactForm />
          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {socials.map(s => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <motion.div whileHover={{ y: -3 }} style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.5rem 1rem", border: "1px solid var(--border)",
                  borderRadius: 8, color: "var(--text-muted)",
                  fontSize: "0.85rem", fontWeight: 500,
                }}>
                  <i className={`ti ${s.icon}`} style={{ fontSize: 16 }} aria-hidden="true" />
                  {s.label}
                </motion.div>
              </a>
            ))}
          </div>
          <div style={{ marginTop: "1.2rem" }}>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{
                padding: "0.65rem 1.6rem", background: "transparent",
                border: "1.5px solid var(--accent2)", color: "var(--accent2)",
                borderRadius: 8, fontWeight: 600, fontSize: "0.88rem",
                cursor: "pointer", fontFamily: "inherit",
                display: "flex", alignItems: "center", gap: "0.5rem",
              }}>
                <i className="ti ti-download" aria-hidden="true" />
                Download Resume
              </motion.button>
            </a>
          </div>
        </motion.div>

        {/* Right — Bug Hunt */}
        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: 16, padding: "1.8rem",
          }}
        >
          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{ color: "var(--accent2)", letterSpacing: 2, fontSize: "0.75rem", fontWeight: 600, marginBottom: "0.3rem" }}>
              WHILE YOU WAIT
            </p>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", margin: 0 }}>
              🐛 Bug Hunt
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", marginTop: "0.3rem" }}>
              Buggy or clean? 5 rounds, new mix every game.
            </p>
          </div>
          <BugHunt />
        </motion.div>

      </div>
    </div>
  );
}