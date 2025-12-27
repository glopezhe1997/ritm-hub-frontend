import { Routes } from '@angular/router';
import { adminGuard } from './Shared/Guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'search',
    loadComponent: () => import('./Search/Components/search-results/search-results.component').then(m => m.SearchResultsComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./Auth/Components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./Users/Components/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'playlists',
    loadComponent: () => import('./Playlists/Components/playlist-list/playlist-list.component').then(m => m.PlaylistListComponent)
  },
  {
  path: 'playlists/create',
  loadComponent: () => import('./Playlists/Components/playlist-form/playlist-form.component').then(m => m.PlaylistFormComponent)
  },
  {
    path: 'playlists/:id',
    loadComponent: () => import('./Playlists/Components/playlist-detail/playlist-detail.component').then(m => m.PlaylistDetailComponent)
  },
  {
    path: 'playlists/edit/:id',
    loadComponent: () => import('./Playlists/Components/playlist-form/playlist-form.component').then(m => m.PlaylistFormComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./Admin/Components/admin-page/admin-page.component').then(m => m.AdminPageComponent),
    canActivate: [adminGuard]
  },
  {
    path: 'forbidden',
    loadComponent: () => import('./Shared/Components/forbidden-page/forbidden-page.component').then(m => m.ForbiddenPageComponent)
  }
];