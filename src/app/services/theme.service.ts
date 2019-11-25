import { Injectable } from '@angular/core';

export const darkTheme = {
    'color-primary': 'black',
    'color-accent': '#ffc107',
    'color-background': '#303030',
    'color-header': 'black',
    'color-font': 'white'
};

export const lightTheme = {
  'color-primary': '#546e7a',
  'color-accent': '#ffc107',
  'color-background': 'white',
  'color-header': 'white',
  'color-font': 'black'
};

@Injectable({ providedIn: 'root' })
export class ThemeService {
  theme = 'light';

  getUserTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.toggleDark();
    } else {
      this.toggleLight();
    }
  }

  toggleDark() {
    this.setTheme(darkTheme);
    this.theme = 'dark';
  }

  toggleLight() {
    this.setTheme(lightTheme);
    this.theme = 'light';
  }

  toggleTheme() {
    this.theme === 'light' ? this.toggleDark() : this.toggleLight();
  }

  private setTheme(theme: {}) {
    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
    );
  }
}
