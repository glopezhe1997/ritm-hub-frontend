import { Component } from '@angular/core';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { NavegationMenuComponent } from "../navegation-menu/navegation-menu.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchBarComponent, NavegationMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
