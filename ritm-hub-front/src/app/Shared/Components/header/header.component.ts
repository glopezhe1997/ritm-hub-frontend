import { Component } from '@angular/core';
import { SearchBarComponent } from "../../../Search/Components/search-bar/search-bar.component";
import { NavegationMenuComponent } from "../navegation-menu/navegation-menu.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchBarComponent, NavegationMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) { }

  onSearch(query: string): void {
    if(!query || query.trim() === '') {
      return;
    }
    this.router.navigate(['/search'], { queryParams: { q: query } });
  }
}
