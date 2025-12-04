import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ArtistItemComponent } from './Artists/artist-item/artist-item.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ArtistItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ritm-hub-front';
}
