// ...existing code...
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { ArtistDto } from '../../Models/artist.dto';

@Component({
  selector: 'app-artist-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artist-item.component.html',
  styleUrls: ['./artist-item.component.css']
})
export class ArtistItemComponent {
  @Input() artist!: ArtistDto;
  @Output() artistClicked = new EventEmitter<ArtistDto>();
  constructor() {}

  onClick(): void {
    this.artistClicked.emit(this.artist);
  }
}
