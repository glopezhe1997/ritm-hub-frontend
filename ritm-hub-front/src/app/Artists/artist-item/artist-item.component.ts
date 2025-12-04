// ...existing code...
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ArtistsService } from '../services/artists.service';
import type { ArtistDto } from '../Models/artist.dto';

@Component({
  selector: 'app-artist-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artist-item.component.html',
  styleUrls: ['./artist-item.component.css']
})
export class ArtistItemComponent implements OnInit {
  artist$!: Observable<ArtistDto>;

  constructor(private artistsService: ArtistsService) {}

  ngOnInit(): void {
    // asigna el observable para usar async pipe en la plantilla
    this.artist$ = this.artistsService.getArtistByName('Foo');

    // opcional: suscripción para depurar en consola
    this.artist$.subscribe({
      next: data => console.log('artist', data),
      error: err => console.error('artist error', err)
    });
  }
}
// ...existing code...