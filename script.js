window.onload = function () {
  let dateInput = prompt("Enter your next birthday using the format below 🔻", "Month Day, Year");
  
  const countDown = () => {
    // Using the current date and the input birthday to get the respective periods. 
    // Using module expression statement to get the period's value and it's max value in regards to actual timing.
    const birthDate = new Date(dateInput);
    const currentDate = new Date();
    const dateDiff = birthDate - currentDate;
  
    const secEquivalent = Math.floor(dateDiff / 1000);
    const minEquivalent = Math.floor(dateDiff / 1000 / 60);
    const hourEquivalent = Math.floor(dateDiff / 1000 / 60 / 60);
    const dayEquivalent = Math.floor(dateDiff / 1000 / 60 / 60 / 24);
  
    const sec = (secEquivalent % 60);
    const min = (minEquivalent % 60);
    const hour = (hourEquivalent % 24);
  
    let d = document.getElementById("day");
    let h = document.getElementById("hour");
    let m = document.getElementById("min");
    let s = document.getElementById("sec");
    let p = document.getElementById("instruction");

    d.value = dayEquivalent;
    h.value = hour;
    m.value = min;
    s.value = sec;
    p.innerHTML = "🎂🌞🍟💓🍦🍷🍾🎁";

    function periodArray() {
      d.value = "0";
      h.value = "0";
      m.value = "0";
      s.value = "0";
    };
    
    // Stating different case conditions to be executed depending on the initial input.
    if (d.value === "NaN" || h.value === "NaN" || m.value === "NaN" || s.value === "NaN") {
      p.innerHTML = "Wrong Date Input. Refresh And Try Again!!!";
      periodArray();
    }
      
    if (d.value > 370) {
      p.innerHTML = "Date is too far!!! Refresh And Input Your Next Birthday."
      periodArray();
    }
      
    if (dateDiff < 0) {
      p.innerHTML = "Refresh And Enter A Validate Date Of Your Next Birthday!!!";
      periodArray();
    }
    
    if (d.value < 10) {d.value = `0${d.value}`}

    if (h.value < 10) {h.value = `0${h.value}`}
    
    if (m.value < 10) {m.value = `0${m.value}`}
    
    if (s.value < 10) {s.value = `0${s.value}`}

    else {
      canvasEl.style = "display: block;";
    }
  }

  setInterval(countDown, 1000);
}


// Code for imported confetti
const canvasEl = document.querySelector('#canvas');

const w = canvasEl.width = window.innerWidth;
const h = canvasEl.height = window.innerHeight * 2;

function loop() {
  requestAnimationFrame(loop);
  ctx.clearRect(0,0,w,h);
  
  confs.forEach((conf) => {
    conf.update();
    conf.draw();
  })
}

function Confetti () {
  //construct confetti
  const colours = ['gold', 'rebeccapurple', 'tomato', 'red'];
  
  this.x = Math.round(Math.random() * w);
  this.y = Math.round(Math.random() * h)-(h/2);
  this.rotation = Math.random()*360;

  const size = Math.random()*(w/60);
  this.size = size < 15 ? 15 : size;

  this.color = colours[Math.floor(colours.length * Math.random())];

  this.speed = this.size/7;
  
  this.opacity = Math.random();

  this.shiftDirection = Math.random() > 0.5 ? 1 : -1;
}

Confetti.prototype.border = function() {
  if (this.y >= h) {
    this.y = h;
  }
}

Confetti.prototype.update = function() {
  this.y += this.speed;
  
  if (this.y <= h) {
    this.x += this.shiftDirection/3;
    this.rotation += this.shiftDirection*this.speed/100;
  }

  if (this.y > h) this.border();
};

Confetti.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, this.rotation, this.rotation+(Math.PI/2));
  ctx.lineTo(this.x, this.y);
  ctx.closePath();
  ctx.globalAlpha = this.opacity;
  ctx.fillStyle = this.color;
  ctx.fill();
};

const ctx = canvasEl.getContext('2d');
const confNum = Math.floor(w / 4);
const confs = new Array(confNum).fill().map(_ => new Confetti());

loop();