import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-play-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './play-button.component.html',
  styleUrl: './play-button.component.css'
})
export class PlayButtonComponent {
  @Input() isPlaying: boolean = false;
  @Output() playPause = new EventEmitter<void>();

  onClick() {
    this.playPause.emit();
  }
}
