import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-follow-button-controller',
  standalone: true,
  imports: [],
  templateUrl: './follow-button-controller.component.html',
  styleUrl: './follow-button-controller.component.css'
})
export class FollowButtonControllerComponent {
  @Output() followChange = new EventEmitter<boolean>();

  isFollowing: boolean = false;

  toggleFollow() {
    this.isFollowing = !this.isFollowing;
    this.followChange.emit(this.isFollowing);
  }
}
