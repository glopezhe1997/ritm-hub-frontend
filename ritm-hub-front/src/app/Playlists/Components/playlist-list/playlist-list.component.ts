import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { PlaylistDto } from '../../Models/playlist.dto';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { CommonModule } from '@angular/common';
import { PlaylistItemComponent } from "../playlist-item/playlist-item.component";
import * as PlaylistActions from '../../actions/playlist.action';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-playlist-list',
  standalone: true,
  imports: [CommonModule, PlaylistItemComponent, RouterLink],
  templateUrl: './playlist-list.component.html',
  styleUrl: './playlist-list.component.css'
})
export class PlaylistListComponent implements OnInit {
  playlists: PlaylistDto[] = [];
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.store.select(state => state.playlistState.playlists).subscribe((playlists: PlaylistDto[]) => {
      this.playlists = playlists;
      console.log('Playlists actualizadas:', this.playlists); // <-- aquí
    });
  }

  ngOnInit(): void {
    this.store.dispatch(PlaylistActions.getUserPlaylists());
  }

  navigateToEdit(playlistId: number | undefined) {
    this.router.navigate([`/playlists/edit/${playlistId}`]);
  }

  onDeletePlaylist(playlistId: number | undefined) {
    if (playlistId !== undefined) {
      this.store.dispatch(PlaylistActions.deleteUserPlaylist({ playlistId }));
    }
  }
}
