const progress = document.getElementById("progress");
const header = document.getElementById("header");
const cursorGlow = document.getElementById("cursorGlow");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

window.addEventListener("scroll", () => {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${(window.scrollY / h) * 100}%`;
  header.classList.toggle("scrolled", window.scrollY > 20);
});

if (window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("mousemove", e => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });
}

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", nav.classList.contains("open"));
});
document.querySelectorAll("#nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: .12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.querySelectorAll(".tech-float").forEach((card, i) => {
  card.animate(
    [{transform:"translateY(0)"},{transform:"translateY(-7px)"},{transform:"translateY(0)"}],
    {duration:3200 + i*450,iterations:Infinity,easing:"ease-in-out"}
  );
});
