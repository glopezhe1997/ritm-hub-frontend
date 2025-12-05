import { Component } from '@angular/core';
import { ArtistItemComponent } from '../artist-item/artist-item.component';
import { ArtistDto } from '../Models/artist.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-list',
  standalone: true,
  imports: [ArtistItemComponent],
  templateUrl: './artist-list.component.html',
  styleUrl: './artist-list.component.css'
})
export class ArtistListComponent {
  
  constructor(private router: Router) {}

  navigateToArtist(artist: ArtistDto) {
    // Lógica para navegar a la página del artista
    this.router.navigate(['/artist', artist.id]);
  }
}
