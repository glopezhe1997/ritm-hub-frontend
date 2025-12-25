import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../Services/Spotify/spotify.service';
import { CommonModule } from '@angular/common';
import { TimeConversionPipe } from '../../../Shared/Pipes/time-conversion.pipe';

interface SearchResultDto {
  artists: any;
  albums: any;
  tracks: any;
  playlists: any;
}

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, TimeConversionPipe],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit {
  results: SearchResultDto | null = null;
  query: string = '';
  artistIndex = 0;
  albumIndex = 0;
  playlistIndex = 0;
  Math = Math;
  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'] || '';
      if (this.query) {
        this.spotifyService.search(this.query).subscribe(res => {
          this.results = res;
        });
      }
    });
  }

  getArtistNames(artists: any[]): string {
    return artists?.map(a => a.name).join(', ') || '';
  }

  getFilteredArtists(): any[] {
  return this.results?.artists?.filter((a: any) => a !== null) || [];
}

getFilteredAlbums(): any[] {
  return this.results?.albums?.filter((a: any) => a !== null) || [];
}

getFilteredTracks(): any[] {
  return this.results?.tracks?.filter((t: any) => t !== null) || [];
}

getFilteredPlaylists(): any[] {
  return this.results?.playlists?.filter((p: any) => p !== null) || [];
}

  sendSelection(result: any, type: string): void {
    console.log('Objeto recibido:', result, 'Tipo:', type);
    const id = result?.id;

    if (id && type) {
      this.spotifyService.postSearch(id, type).subscribe({
        next: (res) => {
          console.log('Selection sent:', res);
        },
        error: (err) => {
          console.error('Error sending selection:', err);
        }
      });
    } else {
      console.error('No id or type found for selection', result);
    }
  }

}