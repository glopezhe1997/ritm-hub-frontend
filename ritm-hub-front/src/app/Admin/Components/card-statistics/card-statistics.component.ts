import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-statistics',
  standalone: true,
  imports: [],
  templateUrl: './card-statistics.component.html',
  styleUrl: './card-statistics.component.css'
})
export class CardStatisticsComponent {
  @Input() title: string = '';
  @Input() value: number = 0;
  
}
