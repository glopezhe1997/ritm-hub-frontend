import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface MenuItem {
  label: string;
  route: string;
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
    { label: 'Home', route: '/home' },
    { label: 'Playlists', route: '/about' },
    { label: 'Social', route: '/social' },
    { label: 'Register', route: '/register' },
    { label: 'Sign In', route: '/sign' },
    { label: 'Profile', route: '/profile' },
    { label: 'admin', route: '/admin' }
  ]
}
