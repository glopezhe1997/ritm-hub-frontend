import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { AppState } from '../../../app.reducer';
import { isAdmin, selectIsAuthenticated } from '../../../Auth/selectors/auth.selectors';
import { logout } from '../../../Auth/actions/auth.action';

interface MenuItem {
  label: string;
  route?: string;
  icon?: string;
  showLabel?: boolean;
  requiresAuth?: boolean;
  requiresGuest?: boolean;
  isLogout?: boolean;
}

@Component({
  selector: 'app-navegation-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navegation-menu.component.html',
  styleUrl: './navegation-menu.component.css'
})
export class NavegationMenuComponent implements OnInit {
  menuItems: MenuItem[] = [
    { label: 'Home', route: '/home', icon: 'home.png', showLabel: false },
    { label: 'Playlists', route: '/playlists', icon: 'songs-icon.png', showLabel: false, requiresAuth: true },
    { label: 'Social', route: '/posts', icon: 'social.png', showLabel: false, requiresAuth: true },
    { label: 'Register', route: '/register', showLabel: true, requiresGuest: true },
    { label: 'Login', route: '/login', showLabel: true, requiresGuest: true },
    { label: 'Profile', route: '/profile', showLabel: true, requiresAuth: true },
    { label: 'Admin', route: '/admin', showLabel: true, requiresAuth: true },
    { label: 'Logout', showLabel: true, requiresAuth: true, isLogout: true }
  ];

  menuState$!: Observable<{ isAuth: boolean, isAdmin: boolean }>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.menuState$ = combineLatest([
      this.store.select(selectIsAuthenticated).pipe(startWith(false)),
      this.store.select(isAdmin).pipe(startWith(false))
    ]).pipe(
      map(([isAuth, isAdmin]) => ({ isAuth, isAdmin }))
    );
  }

  shouldShowItem(item: MenuItem, isAuthenticated: boolean, isAdmin: boolean): boolean {
    if (item.label === 'Admin' && !isAdmin) {
      return false;
    }
    if (item.requiresAuth) {
      return isAuthenticated;
    }
    if (item.requiresGuest) {
      return !isAuthenticated;
    }
    return true;
  }

  onLogout() {
    this.store.dispatch(logout());
  }
}