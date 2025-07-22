// Theme Toggle Functionality
class ThemeToggle {
  constructor() {
    this.checkbox = document.getElementById('theme-toggle-checkbox');
    this.isDark = document.documentElement.classList.contains('dark');
    
    // Set initial state
    this.checkbox.checked = this.isDark;
    
    // Add event listener
    this.checkbox.addEventListener('change', this.toggleTheme.bind(this));
  }
  
  toggleTheme() {
    this.isDark = this.checkbox.checked;
    
    if (this.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Dispatch event for other components to react to theme change
    const event = new CustomEvent('themeChanged', {
      detail: { isDark: this.isDark }
    });
    document.dispatchEvent(event);
  }
}

// Initialize theme toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThemeToggle();
});
