function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    sidebar.classList.toggle('open');
    mainContent.classList.toggle('blur-background');
}

function consoleText(words, id, colors) {
    if (colors === undefined) colors = ['#fff'];
    var visible = true;
    var con = document.getElementById('console' + id);
    var letterCount = 1;
    var x = 1;
    var waiting = false;
    var target = document.getElementById('text' + id);
    target.setAttribute('style', 'color:' + colors[0]);
    window.setInterval(function() {
        if (letterCount === 0 && waiting === false) {
            waiting = true;
            target.innerHTML = words[0].substring(0, letterCount);
            window.setTimeout(function() {
                var usedColor = colors.shift();
                colors.push(usedColor);
                var usedWord = words.shift();
                words.push(usedWord);
                x = 1;
                target.setAttribute('style', 'color:' + colors[0]);
                letterCount += x;
                waiting = false;
            }, 1000);
        } else if (letterCount === words[0].length + 1 && waiting === false) {
            waiting = true;
            window.setTimeout(function() {
                x = -1;
                letterCount += x;
                waiting = false;
            }, 1000);
        } else if (waiting === false) {
            target.innerHTML = words[0].substring(0, letterCount);
            letterCount += x;
        }
    }, 120);
    window.setInterval(function() {
        if (visible === true) {
            con.className = 'console-underscore hidden';
            visible = false;
        } else {
            con.className = 'console-underscore';
            visible = true;
        }
    }, 400);
}

consoleText(['El mundo del HARDWARE.       '], '1', ['tomato']);
consoleText(['¿Que es Software?            '], '2', ['rebeccapurple']); // Ajustar el texto para que se vea completo
consoleText(['Servidores y muchos mas.     '], '3', ['lightblue']);

const canvas = document.getElementById('moleculeCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2
        };
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
            this.velocity.x = -this.velocity.x;
        }

        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            this.velocity.y = -this.velocity.y;
        }

        this.draw();
    }
}

function init() {
    particles = [];
    for (let i = 0; i < 100; i++) {
        const radius = Math.random() * 3 + 1;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        const color = 'rgba(0, 255, 255, 0.8)';
        particles.push(new Particle(x, y, radius, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => particle.update());
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

function animateButtonText(button) {
    const text = button.textContent;
    button.innerHTML = '';
    text.split('').forEach((char, i) => {
        if (char === ' ') {
            const space = document.createElement('div');
            space.className = 'space';
            button.appendChild(space);
        } else {
            const letter = document.createElement('div');
            letter.className = 'letter';
            letter.style.setProperty('--delay', `${i * 0.2}s`);

            const source = document.createElement('span');
            source.className = 'source';
            source.textContent = char;

            const shadow = document.createElement('span');
            shadow.className = 'shadow';
            shadow.textContent = char;

            const overlay = document.createElement('span');
            overlay.className = 'overlay';
            overlay.textContent = char;

            letter.appendChild(source);
            letter.appendChild(shadow);
            letter.appendChild(overlay);
            button.appendChild(letter);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.animated-button');
    animateButtonText(button);
});
