import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostDto } from '../../Models/post.dto';

export interface PostTrackDto {
  id: number;
  title: string;
  album: {
    name: string;
    images?: Array<{ url: string; height: number; width: number }>;
  };
  artists: Array<{ name: string }>;
  duration_ms: number;
  popularity?: number;
  preview_url?: string | null;
  external_id?: string | null;
}

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
