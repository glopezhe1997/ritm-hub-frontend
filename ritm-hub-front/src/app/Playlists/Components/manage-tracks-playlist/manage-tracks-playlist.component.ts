import { Component, Input } from '@angular/core';
import { TrackDto } from '../../../Tracks/Models/track.dto';
import { PlaylistDto } from '../../Models/playlist.dto';
import { TracksService } from '../../../Tracks/services/tracks.service';
import { PlaylistsService } from '../../services/playlists.service';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from "../../../Search/Components/search-bar/search-bar.component";

@Component({
  selector: 'app-manage-tracks-playlist',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './manage-tracks-playlist.component.html',
  styleUrl: './manage-tracks-playlist.component.css'
})
export class ManageTracksPlaylistComponent {
  @Input() playlist: PlaylistDto | undefined;
  searchResults: TrackDto[] = [];

  constructor(
    private tracksService: TracksService,
    private playlistService: PlaylistsService
  ) {}

  onSearchTracks(query: string) {
    this.tracksService.searchTracks(query).subscribe(tracks => {
      this.searchResults = tracks;
      console.log(this.searchResults);
    });
  }

  // addTrackToPlaylist(track: TrackDto) {
  //   if (!this.playlist) return;
  //   this.playlistService.addTrackToPlaylist(this.playlist.playlist_id, track.external_id)
  //     .subscribe(() => {
  //       // Aquí podrías recargar la playlist o actualizar el store
  //     });
  // }

  // removeTrackFromPlaylist(track: TrackDto) {
  //   if (!this.playlist) return;
  //   this.playlistService.removeTrackFromPlaylist(this.playlist.playlist_id, track.id)
  //     .subscribe(() => {
  //       // Aquí podrías recargar la playlist o actualizar el store
  //     });
  // }
}