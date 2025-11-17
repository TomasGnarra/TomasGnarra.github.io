/* ================================
   ANIMATED NETWORK BACKGROUND
================================ */

const canvas = document.getElementById("network");
const ctx = canvas.getContext("2d");

let w, h, nodes;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;

  const totalNodes = Math.min(160, Math.floor(w * h / 9000));

  nodes = Array(totalNodes).fill().map(() => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25
  }));
}

resize();
window.addEventListener("resize", resize);

function draw() {
  if (document.hidden) {
    requestAnimationFrame(draw);
    return;
  }

  ctx.clearRect(0, 0, w, h);

  // Draw nodes
  for (let n of nodes) {
    n.x += n.vx;
    n.y += n.vy;

    if (n.x < 0 || n.x > w) n.vx *= -1;
    if (n.y < 0 || n.y > h) n.vy *= -1;

    ctx.beginPath();
    ctx.arc(n.x, n.y, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,255,213,0.85)";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "rgba(0,255,213,0.4)";
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  // Draw lines
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.hypot(dx, dy);

      if (dist < 140) {
        const opacity = 1 - dist / 140;

        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(0,255,213,${opacity * 0.08})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}

draw();

/* ================================
       HERO TYPING EFFECT
================================ */

const roles = [
  "Data Engineer",
  "Python Developer",
  "ETL Automation Specialist",
  "BigQuery & SQL Expert",
  "Cloud & Pipelines Engineer"
];

let i = 0, j = 0, deleting = false;

const subtitle = document.getElementById("subtitle");

function type() {
  const current = roles[i];
  subtitle.textContent = current.substring(0, j);

  if (!deleting && j === current.length) {
    deleting = true;
    setTimeout(type, 1300);
    return;
  }

  if (deleting && j === 0) {
    deleting = false;
    i = (i + 1) % roles.length;
  }

  j += deleting ? -1 : 1;

  setTimeout(type, deleting ? 45 : 80);
}

type();
