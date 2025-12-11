import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, startWith } from 'rxjs';
import { AppState } from '../../app.reducer';
import { selectIsAuthenticated } from '../../Auth/selectors/auth.selectors';
import { logout } from '../../Auth/actions/auth.action';

interface MenuItem {
  label: string;
  route?: string;
  icon?: string;
  showLabel?: boolean;
  requiresAuth?: boolean;  // true = solo si está autenticado
  requiresGuest?: boolean; // true = solo si NO está autenticado
  isLogout?: boolean;      // true = botón de logout
}

@Component({
  selector: 'app-navegation-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navegation-menu.component.html',
  styleUrl: './navegation-menu.component.css'
})
export class NavegationMenuComponent implements OnInit {
  isAuthenticated$!: Observable<boolean>;

  menuItems: MenuItem[] = [
    { label: 'Home', route: '/home', icon: 'home.png', showLabel: false },
    { label: 'Playlists', route: '/playlists', icon: 'songs-icon.png', showLabel: false, requiresAuth: true },
    { label: 'Social', route: '/social', icon: 'social.png', showLabel: false, requiresAuth: true },
    { label: 'Register', route: '/register', showLabel: true, requiresGuest: true },
    { label: 'Login', route: '/login', showLabel: true, requiresGuest: true },
    { label: 'Profile', route: '/profile', showLabel: true, requiresAuth: true },
    { label: 'Admin', route: '/admin', showLabel: true, requiresAuth: true },
    { label: 'Logout', showLabel: true, requiresAuth: true, isLogout: true }
  ];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated).pipe(
      startWith(false) // <-- Valor inicial
    );
  }

  shouldShowItem(item: MenuItem, isAuthenticated: boolean): boolean {
    if (item.requiresAuth) {
      return isAuthenticated;
    }
    if (item.requiresGuest) {
      return !isAuthenticated;
    }
    return true; // Siempre visible (como Home)
  }

  onLogout() {
    this.store.dispatch(logout());
  }
}