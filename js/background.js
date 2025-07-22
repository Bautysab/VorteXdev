// Background Animation
class BackgroundAnimation {
  constructor() {
    this.canvas = document.getElementById('background-animation');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.isDark = document.documentElement.classList.contains('dark');
    
    this.resizeCanvas();
    this.initParticles();
    this.animate();
    
    window.addEventListener('resize', this.resizeCanvas.bind(this));
    
    // Listen for theme changes
    document.addEventListener('themeChanged', (e) => {
      this.isDark = e.detail.isDark;
    });
  }
  
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.initParticles();
  }
  
  initParticles() {
    this.particles = [];
    const particleCount = Math.min(Math.floor((this.canvas.width * this.canvas.height) / 15000), 150);
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(this.canvas, this.isDark));
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    for (const particle of this.particles) {
      particle.update();
      particle.draw(this.ctx);
    }
    
    this.connectParticles();
    requestAnimationFrame(this.animate.bind(this));
  }
  
  connectParticles() {
    const maxDistance = 150;
    
    for (let a = 0; a < this.particles.length; a++) {
      for (let b = a; b < this.particles.length; b++) {
        const dx = this.particles[a].x - this.particles[b].x;
        const dy = this.particles[a].y - this.particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          const opacity = 1 - distance / maxDistance;
          this.ctx.beginPath();
          this.ctx.strokeStyle = this.isDark ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.05)";
          this.ctx.lineWidth = 1;
          this.ctx.moveTo(this.particles[a].x, this.particles[a].y);
          this.ctx.lineTo(this.particles[b].x, this.particles[b].y);
          this.ctx.stroke();
        }
      }
    }
  }
}

class Particle {
  constructor(canvas, isDark) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.isDark = isDark;
    
    // Different colors based on theme
    if (isDark) {
      const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981"];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    } else {
      const colors = ["#60a5fa", "#a78bfa", "#f472b6", "#34d399"];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    // Bounce off edges
    if (this.x > this.canvas.width || this.x < 0) {
      this.speedX = -this.speedX;
    }
    
    if (this.y > this.canvas.height || this.y < 0) {
      this.speedY = -this.speedY;
    }
  }
  
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = 0.2;
    ctx.fill();
  }
}

// Grid Background
class GridBackground {
  constructor() {
    this.gridElement = document.getElementById('grid-background');
    this.isDark = document.documentElement.classList.contains('dark');
    this.createGridPattern();
    this.createBlobs();
    
    // Listen for theme changes
    document.addEventListener('themeChanged', (e) => {
      this.isDark = e.detail.isDark;
      this.updateGridPattern();
    });
  }
  
  createGridPattern() {
    // Small grid
    const smallGrid = document.createElement('div');
    smallGrid.className = 'small-grid';
    smallGrid.style.position = 'absolute';
    smallGrid.style.inset = '0';
    smallGrid.style.backgroundImage = this.getGridGradient(true);
    smallGrid.style.backgroundSize = '50px 50px';
    
    // Large grid
    const largeGrid = document.createElement('div');
    largeGrid.className = 'large-grid';
    largeGrid.style.position = 'absolute';
    largeGrid.style.inset = '0';
    largeGrid.style.backgroundImage = this.getGridGradient(false);
    largeGrid.style.backgroundSize = '150px 150px';
    
    this.gridElement.appendChild(smallGrid);
    this.gridElement.appendChild(largeGrid);
    
    this.smallGrid = smallGrid;
    this.largeGrid = largeGrid;
  }
  
  getGridGradient(isSmall) {
    const color = this.isDark 
      ? isSmall ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.15)"
      : isSmall ? "rgba(59, 130, 246, 0.05)" : "rgba(59, 130, 246, 0.08)";
      
    return `
      linear-gradient(to right, ${color} 1px, transparent 1px),
      linear-gradient(to bottom, ${color} 1px, transparent 1px)
    `;
  }
  
  updateGridPattern() {
    this.smallGrid.style.backgroundImage = this.getGridGradient(true);
    this.largeGrid.style.backgroundImage = this.getGridGradient(false);
  }
  
  createBlobs() {
    const blobPositions = [
      { top: '25%', left: '-5%', color: 'blue' },
      { top: '75%', right: '-5%', color: 'purple' },
      { bottom: '25%', left: '33%', color: 'pink' }
    ];
    
    blobPositions.forEach((pos, index) => {
      const blob = document.createElement('div');
      blob.className = 'blob';
      blob.style.position = 'absolute';
      blob.style.width = '24rem';
      blob.style.height = '24rem';
      blob.style.borderRadius = '9999px';
      blob.style.filter = 'blur(3rem)';
      blob.style.opacity = '0.3';
      blob.style.animation = `blob 25s infinite alternate`;
      blob.style.animationDelay = `${index * 2}s`;
      
      // Set position
      Object.keys(pos).forEach(key => {
        if (key !== 'color') {
          blob.style[key] = pos[key];
        }
      });
      
      // Set color
      switch(pos.color) {
        case 'blue':
          blob.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
          break;
        case 'purple':
          blob.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
          break;
        case 'pink':
          blob.style.backgroundColor = 'rgba(236, 72, 153, 0.1)';
          break;
      }
      
      this.gridElement.appendChild(blob);
    });
  }
}

// Initialize backgrounds when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new BackgroundAnimation();
  new GridBackground();
});
