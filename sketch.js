let posX, posY;
let dragging = false;
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  posX = width / 2;
  posY = height / 2;
}

function draw() {
  background(250, 240, 230); 
  
  // Partículas satisfactorias
  if (dragging) {
    particles.push(new Particle(mouseX, mouseY));
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) particles.splice(i, 1);
  }

  // El elemento de diseño (Logo)
  drawLogo(posX, posY);
}

function drawLogo(x, y) {
  fill(212, 175, 55); 
  noStroke();
  ellipse(x, y, 100, 100);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text("D’ANAS", x, y);
}

function mousePressed() {
  if (dist(mouseX, mouseY, posX, posY) < 50) dragging = true;
}

function mouseReleased() {
  dragging = false;
  if (dist(posX, posY, width/2, height/2) < 40) {
    posX = width/2; posY = height/2;
  }
}

function mouseDragged() {
  if (dragging) {
    posX = mouseX;
    posY = mouseY;
  }
}

class Particle {
  constructor(x, y) {
    this.x = x; this.y = y;
    this.vx = random(-1, 1); this.vy = random(-1, 1);
    this.alpha = 255;
  }
  finished() { return this.alpha < 0; }
  update() { this.x += this.vx; this.y += this.vy; this.alpha -= 5; }
  show() {
    noStroke();
    fill(255, 215, 0, this.alpha);
    ellipse(this.x, this.y, 8);
  }
}
