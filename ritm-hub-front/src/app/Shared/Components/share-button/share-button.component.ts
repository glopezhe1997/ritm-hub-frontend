import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UsersService } from '../../../Users/services/users.service';
import { FormsModule } from '@angular/forms';
import { PlaylistsService } from '../../../Playlists/services/playlists.service';
import { ToastService } from '../../services/toast.service';

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
    private toastService: ToastService,
  ) {}

  share() {
    if (this.isPublic) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        this.copied = true;
        this.toastService.show('¡Link correctly!', 'info'); // <-- toast
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
        this.toastService.show('Playlist correctly shared!', 'success'); // <-- toast
      },
      error: (err) => {
        alert(err?.error?.message || 'Error sharing the playlist.');
      }
    });
  }
}