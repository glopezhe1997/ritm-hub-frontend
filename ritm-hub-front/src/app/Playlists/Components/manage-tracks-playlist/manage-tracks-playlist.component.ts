import { Component, Input } from '@angular/core';
import { TrackDto } from '../../../Tracks/Models/track.dto';
import { PlaylistDto } from '../../Models/playlist.dto';
import { TracksService } from '../../../Tracks/services/tracks.service';
import { PlaylistsService } from '../../services/playlists.service';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from "../../../Search/Components/search-bar/search-bar.component";
import { AppState } from '../../../app.reducer';
import { Store } from '@ngrx/store';
import * as PlaylistActions from '../../actions/playlist.action';
import { TimeConversionPipe } from '../../../Shared/Pipes/time-conversion.pipe';
@Component({
  selector: 'app-manage-tracks-playlist',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, TimeConversionPipe],
  templateUrl: './manage-tracks-playlist.component.html',
  styleUrl: './manage-tracks-playlist.component.css'
})
export class ManageTracksPlaylistComponent {
  @Input() playlist: PlaylistDto | undefined;
  searchResults: TrackDto[] = [];

  constructor(
    private tracksService: TracksService,
    private playlistService: PlaylistsService,
    private store: Store<AppState>
  ) {}

  onSearchTracks(query: string) {
    this.tracksService.searchTracks(query).subscribe(tracks => {
      this.searchResults = tracks;
      console.log(this.searchResults);
    });
  }

  addTrackToPlaylist(track: TrackDto) {
    if (!this.playlist) return;
    console.log('Añadiendo track:', track);
    this.store.dispatch(PlaylistActions.addTrackToPlaylist({
      playlistId: this.playlist.playlist_id,
      trackExternalId: track.id.toString()
    }));
  }

  removeTrackFromPlaylist(track: TrackDto) {
    if (!this.playlist) return;
    console.log('Eliminando track:', track);
    this.store.dispatch(PlaylistActions.removeTrackFromPlaylist({
      playlistId: this.playlist.playlist_id,
      trackId: track.id
    }));
  }
}