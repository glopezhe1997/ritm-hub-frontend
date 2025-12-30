import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ViewSelected } from '../post-list/post-list.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-post-view-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-view-selector.component.html',
  styleUrl: './post-view-selector.component.css'
})
export class PostViewSelectorComponent {
  @Input() viewSelected!: ViewSelected;
  @Output() viewChange = new EventEmitter<ViewSelected>();

  views = [ViewSelected.FEED, ViewSelected.MYPOSTS, ViewSelected.FOLLOWING];

  selectView(view: ViewSelected) {
    this.viewChange.emit(view);
  }

}
