import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'search',
    loadComponent: () => import('./Search/search-results/search-results.component').then(m => m.SearchResultsComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./Auth/login/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./Users/Components/register/register.component').then(m => m.RegisterComponent)
  }
];