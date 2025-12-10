import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchResultsComponent } from './Search/search-results/search-results.component';
import { LoginComponent } from './Auth/login/login/login.component';
import { RegisterComponent } from './Users/Components/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchResultsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
];
