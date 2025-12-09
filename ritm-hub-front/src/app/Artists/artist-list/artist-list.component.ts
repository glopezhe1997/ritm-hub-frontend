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
  //  artists: ArtistDto[] = [
  //   { : 1, name: 'Artist 1', img_url: '...', followers: {href: null , total: 1000 }, external_id: '...', genres: ['pop'] },
  //   { id: 2, name: 'Artist 2', img_url: '...', followers: 2000, external_id: '...', genres: ['rock', 'blues'] },
  //   // ...más artistas
  // ];
  // constructor(private router: Router) {}

  // navigateToArtist(artist: ArtistDto) {
  //   // Lógica para navegar a la página del artista
  //   this.router.navigate(['/artist', artist.id]);
  // }
}
