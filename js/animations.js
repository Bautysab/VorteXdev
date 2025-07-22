// Scroll Animations
class ScrollAnimations {
  constructor() {
    this.animatedElements = document.querySelectorAll('.animate-on-scroll');
    this.observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.observerOptions);
    
    this.animatedElements.forEach(element => {
      this.observer.observe(element);
      
      // Apply delay if specified
      const delay = element.getAttribute('data-delay');
      if (delay) {
        element.style.transitionDelay = `${delay}s`;
      }
    });
  }
  
  handleIntersect(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }
}

// Menu Animations
class MenuAnimations {
  constructor() {
    this.menuItems = document.querySelectorAll('.menu-item-container');
    
    this.menuItems.forEach(item => {
      item.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
      item.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    });
  }
  
  handleMouseEnter(e) {
    const container = e.currentTarget;
    const frontLink = container.querySelector('.menu-link');
    const backLink = container.querySelector('.menu-link-back');
    const glow = container.querySelector('.menu-item-glow');
    
    frontLink.style.transform = 'rotateX(-90deg)';
    frontLink.style.opacity = '0';
    
    backLink.style.transform = 'rotateX(0)';
    backLink.style.opacity = '1';
    
    glow.style.opacity = '1';
    glow.style.transform = 'scale(2)';
  }
  
  handleMouseLeave(e) {
    const container = e.currentTarget;
    const frontLink = container.querySelector('.menu-link');
    const backLink = container.querySelector('.menu-link-back');
    const glow = container.querySelector('.menu-item-glow');
    
    frontLink.style.transform = 'rotateX(0)';
    frontLink.style.opacity = '1';
    
    backLink.style.transform = 'rotateX(90deg)';
    backLink.style.opacity = '0';
    
    glow.style.opacity = '0';
    glow.style.transform = 'scale(0.8)';
  }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ScrollAnimations();
  new MenuAnimations();
});
