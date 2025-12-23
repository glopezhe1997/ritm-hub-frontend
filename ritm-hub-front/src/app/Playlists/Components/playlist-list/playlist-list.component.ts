import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { PlaylistDto } from '../../Models/playlist.dto';
import { PlaylistsService } from '../../services/playlists.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { CommonModule } from '@angular/common';
import { PlaylistItemComponent } from "../playlist-item/playlist-item.component";
import * as PlaylistActions from '../../actions/playlist.action';
import { RouterLink } from "@angular/router";

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
    private playlistsService: PlaylistsService,
    private store: Store<AppState>
  ) {
    this.store.select(state => state.playlistState.playlists).subscribe((playlists: PlaylistDto[]) => {
      this.playlists = playlists;
      console.log('Playlists actualizadas:', this.playlists); // <-- aquí
    });
  }

  ngOnInit(): void {
    this.store.dispatch(PlaylistActions.getUserPlaylists());
  }
}
