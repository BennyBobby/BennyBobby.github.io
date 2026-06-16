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
