// ===== Floating hearts =====
const heartsBox = document.getElementById("hearts");
const heartIcons = ["💖", "💕", "💗", "❤️", "💓", "✨"];

function spawnHeart() {
  const h = document.createElement("span");
  h.className = "heart";
  h.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = 12 + Math.random() * 18 + "px";
  h.style.animationDuration = 7 + Math.random() * 6 + "s";
  heartsBox.appendChild(h);
  setTimeout(() => h.remove(), 14000);
}
setInterval(spawnHeart, 700);

// ===== Envelope open =====
const intro = document.getElementById("intro");
const main = document.getElementById("main");
const openBtn = document.getElementById("openBtn");

openBtn.addEventListener("click", () => {
  openBtn.classList.add("open");
  setTimeout(() => {
    intro.classList.add("hide");
    setTimeout(() => {
      intro.style.display = "none";
      main.hidden = false;
      window.scrollTo(0, 0);
      burstConfetti(220);
      setupReveal();
    }, 700);
  }, 1300);
});

// ===== Countdown to 28 Oct (Sri Lanka time) =====
const countdown = document.getElementById("countdown");
const target = new Date("2026-10-21T00:00:00+05:30").getTime();

function tick() {
  const diff = target - Date.now();
  if (diff <= 0) {
    countdown.hidden = true;
    return false;
  }
  countdown.hidden = false;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById("cd-days").textContent = d;
  document.getElementById("cd-hours").textContent = String(h).padStart(2, "0");
  document.getElementById("cd-mins").textContent = String(m).padStart(2, "0");
  document.getElementById("cd-secs").textContent = String(s).padStart(2, "0");
  return true;
}
if (tick()) {
  const timer = setInterval(() => { if (!tick()) clearInterval(timer); }, 1000);
}

// ===== Scroll reveal =====
function setupReveal() {
  const items = document.querySelectorAll(".card, .wishes, .celebrate-btn");
  items.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
    }),
    { threshold: 0.15 }
  );
  items.forEach((el) => io.observe(el));
}

// ===== Confetti =====
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let pieces = [];
let animating = false;
const colors = ["#ff7eb3", "#ff4f8b", "#ffd59e", "#ffc2da", "#ffffff", "#c77dff"];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function burstConfetti(count = 150) {
  for (let i = 0; i < count; i++) {
    pieces.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 120,
      y: canvas.height / 3,
      vx: (Math.random() - 0.5) * 14,
      vy: Math.random() * -12 - 4,
      size: 5 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * 360,
      vr: (Math.random() - 0.5) * 12,
      life: 0,
    });
  }
  if (!animating) { animating = true; requestAnimationFrame(draw); }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces.forEach((p) => {
    p.vy += 0.3;
    p.vx *= 0.99;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    p.life++;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rot * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    ctx.restore();
  });
  pieces = pieces.filter((p) => p.y < canvas.height + 20 && p.life < 400);
  if (pieces.length) requestAnimationFrame(draw);
  else { animating = false; ctx.clearRect(0, 0, canvas.width, canvas.height); }
}

// ===== Make a wish button =====
const celebrateBtn = document.getElementById("celebrateBtn");
celebrateBtn.addEventListener("click", () => {
  burstConfetti(180);
  for (let i = 0; i < 15; i++) setTimeout(spawnHeart, i * 80);
  celebrateBtn.textContent = "Wish granted 💖";
});
