import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-trending-items',
  standalone: true,
  imports: [],
  templateUrl: './trending-items.component.html',
  styleUrl: './trending-items.component.css'
})
export class TrendingItemsComponent {
  @Input() itemType: string = ''; //Track, Album, Artist...
  @Input() title: string = '';  //Title of the item
  @Input() image: string = ''; //Image URL
  @Input() link: string = ''; //Link to the item
  @Input() content: string = ''; //Additional content or description
}
