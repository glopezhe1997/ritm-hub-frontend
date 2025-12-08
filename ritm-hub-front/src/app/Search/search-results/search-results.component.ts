import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../Services/Spotify/spotify.service';
import { CommonModule } from '@angular/common';

interface SearchResultDto {
  artists: any;
  albums: any;
  tracks: any;
  playlists: any;
}

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule],
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
}