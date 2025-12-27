import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-playlist-item',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './playlist-item.component.html',
  styleUrl: './playlist-item.component.css'
})
export class PlaylistItemComponent {
  @Input() playlistName: string = '';
  @Input() trackCount: number = 0;
  @Input() playlistId: number | undefined;
  @Input() ownerByUser: boolean | undefined = false;
  @Input() imageUrl: string | undefined = '';
  @Output() editPlaylist = new EventEmitter<number>();
  @Output() deletePlaylist = new EventEmitter<number>();

  constructor() { }

  onEdit() {
    this.editPlaylist.emit(this.playlistId);
  }

  onDelete() {
    this.deletePlaylist.emit(this.playlistId);
  }

  showButtons(): boolean {
    return this.ownerByUser ?? false;
  }
}
