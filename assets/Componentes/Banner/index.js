const poster = document.querySelector(".poster");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let _WIDTH = (canvas.width = vmin(80));
let _HEIGHT = (canvas.height = vmin(98));
let refreshBtn = document.getElementById("refresh");

const numOfBokehs = 15;
let bokehArray = [];

refreshBtn.addEventListener("click", (e) => {
  e.preventDefault();
  bokehArray = [];
  for (let i = 0; i < numOfBokehs; i++) {
    bokehArray.push(new Bokeh());
  }
});

class Bokeh {
  constructor() {
    this.size = Math.random() * 80 + 50;
    this.x = Math.random() * (canvas.width - this.size);
    this.y = Math.random() * (canvas.height - this.size);
    this.H = 240;
    this.S = Math.floor(Math.random() * 90 + 60);
    this.L = Math.floor(Math.random() * 60 + 10);
    this.angleX = Math.random() * 4 - 2;
    this.angleY = Math.random() * 4 - 2;
  }
  update() {
    this.x += Math.cos(this.angleX);
    this.y += Math.sin(this.angleY);
    if (this.x >= canvas.height - this.size || this.x <= this.size) {
      this.x -= Math.cos(this.angleX);
    }
    if (this.y >= canvas.height - this.size || this.y <= this.size) {
      this.y -= Math.sin(this.angleX);
    }
    this.angleX += 0.002;
    this.angleY += 0.002;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
    ctx.fillStyle = `hsl(${this.H},${this.S}%,${this.L}%)`;
    ctx.fill();
  }
}

for (let i = 0; i < numOfBokehs; i++) {
  bokehArray.push(new Bokeh());
}

function vmin(vpPercent) {
  vpPercent = vpPercent / 100;
  let vpMinSize = Math.min(window.innerWidth, window.innerHeight);
  return vpPercent * vpMinSize;
}

function animate() {
  ctx.clearRect(0, 0, _WIDTH, _HEIGHT);
  bokehArray.forEach((bok) => {
    bok.draw();
    bok.update();
  });
  requestAnimationFrame(animate);
}

animate();
