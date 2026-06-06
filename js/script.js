const TAG_CONFIG = [
  { cls: "tag-torch", label: "Deep\nLearning", color: "#ef4444" },
  { cls: "tag-nlp", label: "NLP /\nLLM", color: "#6366f1" },
  { cls: "tag-devops", label: "MLOps", color: "#475569" },
  { cls: "tag-data", label: "Data Engineering", color: "#eab308" },
  { cls: "tag-py", label: "Python", color: "#3b82f6" },
  { cls: "tag-cv", label: "Computer\nVision", color: "#16a34a" },
  { cls: "tag-api", label: "Backend", color: "#0d9488" },
  { cls: "tag-front", label: "Frontend", color: "#ec4899" },
  { cls: "tag-test", label: "Testing", color: "#d97706" },
  { cls: "tag-optim", label: "Optimization", color: "#06b6d4" },
];

function buildSkillStats() {
  const legend = document.getElementById("tags-legend");
  if (!legend) return;

  const counts = TAG_CONFIG.map((t) => ({
    ...t,
    count: [...document.querySelectorAll(".skill-tags")].filter((st) =>
      st.querySelector("." + t.cls),
    ).length,
  }));
  const max = Math.max(...counts.map((t) => t.count));
  const n = counts.length;
  const cx = 280,
    cy = 220,
    R = 150,
    LEVELS = 4;

  const ang = (i) => ((2 * Math.PI) / n) * i - Math.PI / 2;
  const pt = (i, r) => [cx + r * Math.cos(ang(i)), cy + r * Math.sin(ang(i))];

  const grids = Array.from({ length: LEVELS }, (_, l) => {
    const r = (R * (l + 1)) / LEVELS;
    const pts = counts.map((_, i) => pt(i, r).join(",")).join(" ");
    return `<polygon points="${pts}" fill="none" stroke="#c4b49c" stroke-width="1"/>`;
  }).join("");

  const axes = counts
    .map((_, i) => {
      const [x, y] = pt(i, R);
      return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#c4b49c" stroke-width="1"/>`;
    })
    .join("");

  const dataPath = counts
    .map((t, i) => pt(i, (R * t.count) / max).join(","))
    .join(" ");

  const dots = counts
    .map((t, i) => {
      const [x, y] = pt(i, (R * t.count) / max);
      return `<circle cx="${x}" cy="${y}" r="5" fill="${t.color}" stroke="white" stroke-width="1.5"/>`;
    })
    .join("");

  const labels = counts
    .map((t, i) => {
      const [x, y] = pt(i, R + 26);
      const anchor =
        Math.abs(x - cx) < 15 ? "middle" : x > cx ? "start" : "end";
      const lines = t.label.split("\n");
      const tspans = lines
        .map(
          (line, j) =>
            `<tspan x="${x.toFixed(1)}" dy="${j === 0 ? (lines.length > 1 ? "-0.5em" : "0.35em") : "1.2em"}">${line}</tspan>`,
        )
        .join("");
      return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anchor}" font-size="11.5" fill="#583e2e" font-family="Arial,sans-serif" font-weight="600">${tspans}</text>`;
    })
    .join("");

  legend.innerHTML = `
    <svg viewBox="0 0 560 440" xmlns="http://www.w3.org/2000/svg" class="radar-svg">
      ${grids}
      ${axes}
      <polygon points="${dataPath}" fill="rgba(88,62,46,0.12)" stroke="#583e2e" stroke-width="2.5" stroke-linejoin="round"/>
      ${dots}
      ${labels}
    </svg>`;

  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      legend.querySelector(".radar-svg").style.opacity = "1";
    }),
  );
}

document.addEventListener("DOMContentLoaded", buildSkillStats);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

function toggleCVDropdown() {
  document.getElementById("cvDropdown").classList.toggle("open");
}

document.addEventListener("click", (e) => {
  if (!e.target.closest(".cv-dropdown-wrapper")) {
    document.getElementById("cvDropdown").classList.remove("open");
  }
});
