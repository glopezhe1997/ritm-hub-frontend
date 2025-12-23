import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-playlist-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './playlist-item.component.html',
  styleUrl: './playlist-item.component.css'
})
export class PlaylistItemComponent {
  @Input() playlistName: string = '';
  @Input() trackCount: number = 0;
  @Input() playlistId: number | undefined;
  @Input() imageUrl: string | undefined = '';
}
