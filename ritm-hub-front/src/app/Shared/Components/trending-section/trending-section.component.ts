import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendingItemsComponent } from '../trending-items/trending-items.component';
import { RouterLink } from '@angular/router';

interface TrendingItem {
  title: string;
  image: string;
  link: string;
  content: string;
}

@Component({
  selector: 'app-trending-section',
  standalone: true,
  imports: [CommonModule, RouterLink, TrendingItemsComponent, RouterLink],
  templateUrl: './trending-section.component.html',
  styleUrl: './trending-section.component.css'
})
export class TrendingSectionComponent implements OnInit {
  @Input() sectionTitle: string = '';
  @Input() itemType: string = ''; // 'playlist', 'artist', 'album'
  @Input() items: TrendingItem[] = [];
  linkToAll: string = '';

  ngOnInit() {
    this.linkToAll = this.dynamicViewAllLink(this.itemType);
  }

  dynamicViewAllLink(itemType: string): string {
    switch (itemType) {
      case 'Playlists':
        return '/playlists';
      case 'Artists':
        return '/artists';
      case 'Albums':
        return '/albums';
      case 'Tracks':
        return '/tracks';
      default:
        return '/';
    }
  }
}