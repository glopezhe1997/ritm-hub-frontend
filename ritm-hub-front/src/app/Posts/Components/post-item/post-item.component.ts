import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostDto } from '../../Models/post.dto';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.css'
})
export class PostItemComponent {
  @Input() postId!: number;
  @Input() myPosts: boolean = false;
  @Output() onEdit = new EventEmitter<number>();
  @Output() onDelete = new EventEmitter<number>();
  @Input() post!: PostDto | null;

  editPost() {
    this.onEdit.emit(this.postId);
  }

  deletePost() {
    this.onDelete.emit(this.postId);
  }
  
}
