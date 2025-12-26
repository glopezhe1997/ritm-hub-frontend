import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UsersService } from '../../../Users/services/users.service';
import { FormsModule } from '@angular/forms';

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

  constructor(private usersService: UsersService) {}

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
        // TODO: Exclude current user from results
        this.users = users;
      });
    }
  }

  selectUser(userId: number) {
    // Aquí llama a tu API para registrar el share en shared_playlists
    // Ejemplo: this.playlistsService.sharePlaylistPrivately(this.playlistId, userId).subscribe(...)
    this.showUserInput = false;
    alert('Playlist compartida con el usuario seleccionado.');
  }
}