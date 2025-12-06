import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../Shared/header/header.component";
import { FeatureCardComponent } from "../Shared/feature-card/feature-card.component";
import { TrendingSectionComponent } from "../Shared/trending-section/trending-section.component";
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ArtistDto } from '../Artists/Models/artist.dto';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { getTrendingArtists } from '../Artists/actions/artist.action';

interface TrendingItem {
  title: string;
  image: string;
  link: string;
  content: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FeatureCardComponent, TrendingSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  trendingArtists$!: Observable<TrendingItem[]>;

  // popularArtists = [
  //   { title: 'Artist Name', image: 'assets/artists/1.jpg', link: '/artist/1', content: 'Pop' },
  //   { title: 'Another Artist', image: 'assets/artists/2.jpg', link: '/artist/2', content: 'Hip Hop' }
  // ];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    // Dispatch la acción para cargar artistas
    this.store.dispatch(getTrendingArtists());
    
    // Transforma ArtistDto[] a TrendingItem[]
    this.trendingArtists$ = this.store.select(state => state.artistState.artists).pipe(
      tap(artists => console.log('Artists from store:', artists)),
      map(artists => artists.map(artist => ({
        title: artist.name,
        image: artist.images?.[0]?.url || 'assets/default-artist.png',
        link: `/artist/${artist.id}`,
        content: `${artist.followers?.total?.toLocaleString() || 0} followers`
      }))),
      tap(items => {
        console.log('Transformed items:', items);
        items.forEach(item => {
          console.log('Title:', item.title);
          console.log('Image:', item.image);
          console.log('Link:', item.link);
          console.log('Content:', item.content);
          console.log('---');
        });
      })
    );
  }
}