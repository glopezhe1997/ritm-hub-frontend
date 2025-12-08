import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchResultsComponent } from './Search/search-results/search-results.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchResultsComponent}
];
