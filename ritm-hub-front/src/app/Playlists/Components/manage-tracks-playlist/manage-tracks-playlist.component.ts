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
import { PlayButtonComponent } from "../../../Shared/Components/play-button/play-button.component";
@Component({
  selector: 'app-manage-tracks-playlist',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, TimeConversionPipe, PlayButtonComponent],
  templateUrl: './manage-tracks-playlist.component.html',
  styleUrl: './manage-tracks-playlist.component.css'
})
export class ManageTracksPlaylistComponent {
  @Input() playlist: PlaylistDto | undefined;
  searchResults: TrackDto[] = [];
  currentPlayingTrackId: number | null = null;
  audio: HTMLAudioElement | null = null;

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
    this.store.dispatch(PlaylistActions.removeTrackFromPlaylist({
      playlistId: this.playlist.playlist_id,
      trackId: track.id
    }));
  }

  // Toggle play/pause functionality
  togglePlay(track: TrackDto) {
    if (this.currentPlayingTrackId === track.id) {
      // Pausar
      this.audio?.pause();
      this.currentPlayingTrackId = null;
    } else {
      // Si ya hay un audio sonando, páralo
      if (this.audio) {
        this.audio.pause();
        this.audio = null;
      }
      if (track.preview_url) {
        this.audio = new Audio(track.preview_url);
        this.audio.play();
        this.currentPlayingTrackId = track.id;
        // Cuando termine, resetea el estado
        this.audio.onended = () => {
          this.currentPlayingTrackId = null;
          this.audio = null;
        };
      }
    }
  }

  ngOnDestroy() {
    // Limpia el audio al destruir el componente
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }
}