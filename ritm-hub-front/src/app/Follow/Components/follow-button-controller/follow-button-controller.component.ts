import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-follow-button-controller',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './follow-button-controller.component.html',
  styleUrl: './follow-button-controller.component.css'
})
export class FollowButtonControllerComponent {
  @Output() followChange = new EventEmitter<boolean>();
  @Input() isFollowing: boolean = false;

  toggleFollow() {
    this.isFollowing = !this.isFollowing;
    this.followChange.emit(this.isFollowing);
  }
}
