import { Component, OnInit } from '@angular/core';
import { FeatureCardComponent } from "../Shared/feature-card/feature-card.component";
import { TrendingSectionComponent } from "../Shared/trending-section/trending-section.component";
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ArtistDto } from '../Artists/Models/artist.dto';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { getTrendingArtists } from '../Artists/actions/artist.action';
import { getTrendingAlbums } from '../Albums/actions';
import { getTrendingTracks } from '../Tracks/actions';
import { getTrendingPlaylists} from '../Playlists/actions';

interface TrendingItem {
  title: string;
  image: string;
  link: string;
  content: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    FeatureCardComponent, 
    TrendingSectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  trendingArtists$!: Observable<TrendingItem[]>;
  trendingAlbums$!: Observable<TrendingItem[]>;
  trendingTracks$!: Observable<TrendingItem[]>;
  trendingPlaylists$!: Observable<TrendingItem[]>

  constructor(
    private store: Store<AppState>) {}

  ngOnInit() {
    // Dispatch la acción para cargar artistas
    this.store.dispatch(getTrendingArtists());
    this.store.dispatch(getTrendingAlbums());
    this.store.dispatch(getTrendingTracks());
    this.store.dispatch(getTrendingPlaylists());

    // Transforma ArtistDto[] a TrendingItem[]
    this.trendingArtists$ = this.store.select(state => state.artistState.artists).pipe(
      tap(artists => console.log('Artists from store:', artists)),
      map(artists => artists.map(artist => ({
        title: artist.name,
        image: artist.images?.[0]?.url || 'assets/default-artist.png',
        link: `/artist/${artist.id}`,
        content: `${artist.followers?.total?.toLocaleString() || 0} followers`
      })))
    );

    this.trendingAlbums$ = this.store.select(state => state.albumState.albums).pipe(
      tap(albums => console.log('Albums from store:', albums)),
      map(albums => albums.map(album => ({
        title: album.name,
        image: album.images?.[0]?.url || 'assets/default-album.png',
        link: `/album/${album.id}`,
        content: `By ${album.artists?.[0]?.name || 'Unknown'}`
      })))
    );

    this.trendingTracks$ = this.store.select(state => state.trackState.tracks).pipe(
      tap(tracks => console.log('Tracks from store:', tracks)),
      map(tracks => tracks.map(track => ({
        title: track.name,
        image: track.album?.images?.[0]?.url || 'assets/default-track.png',
        link: `/track/${track.id}`,
        content: `By ${track.artists?.map(artist => artist.name).join(', ') || 'Unknown'}`
      })))
    );

    this.trendingPlaylists$ = this.store.select(state => state.playlistState.playlists).pipe(
      tap(playlists => console.log('Playlists from store:', playlists)),
      map(playlists => playlists
        .filter(playlist => playlist !== null && playlist !== undefined) // <-- Filtra nulos
        .map(playlist => ({
          title: playlist.name,
          image: playlist.images?.[0]?.url || 'assets/default-playlist.png',
          link: `/playlist/${playlist.id}`,
          content: `By ${playlist.owner?.display_name || 'Unknown'} - ${playlist.tracks?.total || 0} tracks`
        }))
      )
    );
  }
}