import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UsersService } from '../../../Users/services/users.service';
import { FormsModule } from '@angular/forms';
import { PlaylistsService } from '../../../Playlists/services/playlists.service';

@Component({
  selector: 'app-share-button',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './share-button.component.html',
  styleUrl: './share-button.component.css'
})
export class ShareButtonComponent {
  @Input() item: string = '';
  @Input() isPublic: boolean | undefined = true;
  @Input() playlistId?: number;

  copied = false;
  showUserInput = false;
  userQuery = '';
  users: any[] = [];

  constructor(
    private usersService: UsersService,
    private playlistsService: PlaylistsService,
  ) {}

  share() {
    if (this.isPublic) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        this.copied = true;
        setTimeout(() => this.copied = false, 1500);
      });
    } else {
      this.showUserInput = true;
    }
  }

  searchUsers() {
    if (this.userQuery.length > 2) {
      this.usersService.searchUsers(this.userQuery).subscribe(users => {
        this.users = users;
      });
    }
  }

  selectUser(userId: number) {
    if (!this.playlistId) return;
    this.playlistsService.sharePlaylistWithUser(this.playlistId, userId).subscribe({
      next: () => {
        this.showUserInput = false;
        alert('Playlist compartida con el usuario seleccionado.');
      },
      error: (err) => {
        alert(err?.error?.message || 'Error al compartir la playlist.');
      }
    });
  }
}