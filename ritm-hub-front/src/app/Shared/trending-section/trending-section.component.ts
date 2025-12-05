import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendingItemsComponent } from '../trending-items/trending-items.component';

interface TrendingItem {
  title: string;
  image: string;
  link: string;
  content: string;
}

@Component({
  selector: 'app-trending-section',
  standalone: true,
  imports: [CommonModule, TrendingItemsComponent],
  templateUrl: './trending-section.component.html',
  styleUrl: './trending-section.component.css'
})
export class TrendingSectionComponent {
  @Input() sectionTitle: string = '';
  @Input() itemType: string = ''; // 'playlist', 'artist', 'album'
  @Input() items: TrendingItem[] = [];
}