import { Component } from '@angular/core';
import { HeaderComponent } from "../Shared/header/header.component";
import { FeatureCardComponent } from "../Shared/feature-card/feature-card.component";
import { TrendingSectionComponent } from "../Shared/trending-section/trending-section.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FeatureCardComponent, TrendingSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
   trendingPlaylists = [
    { title: 'Chill Vibes', image: 'assets/playlists/1.jpg', link: '/playlist/1', content: '120 songs' },
    { title: 'Workout Mix', image: 'assets/playlists/2.jpg', link: '/playlist/2', content: '85 songs' },
    { title: 'Party Hits', image: 'assets/playlists/3.jpg', link: '/playlist/3', content: '200 songs' }
  ];

  popularArtists = [
    { title: 'Artist Name', image: 'assets/artists/1.jpg', link: '/artist/1', content: 'Pop' },
    { title: 'Another Artist', image: 'assets/artists/2.jpg', link: '/artist/2', content: 'Hip Hop' }
  ];
}
