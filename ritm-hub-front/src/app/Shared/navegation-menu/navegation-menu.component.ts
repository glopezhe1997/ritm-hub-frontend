import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface MenuItem {
  label: string;
  route: string;
  icon?: string;
  showLabel?: boolean;
}

@Component({
  selector: 'app-navegation-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navegation-menu.component.html',
  styleUrl: './navegation-menu.component.css'
})

export class NavegationMenuComponent {
  menuItems: MenuItem[] = [
    { label: 'Home', route: '/home', icon: 'home.png', showLabel: false },
    { label: 'Playlists', route: '/playlists', icon: 'songs-icon.png', showLabel: false },
    { label: 'Social', route: '/social', icon: 'social.png', showLabel: false },
    { label: 'Register', route: '/register', showLabel: true },
    { label: 'Sign In', route: '/sign', showLabel: true },
    { label: 'Profile', route: '/profile', showLabel: true },
    { label: 'Admin', route: '/admin', showLabel: true }
  ];
}
