import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostDto } from '../../Models/post.dto';
import { AppState } from '../../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { getMyPosts } from '../../actions/post.action';
import { PostItemComponent } from '../post-item/post-item.component';
import { CommonModule } from '@angular/common';
import { PostViewSelectorComponent } from '../post-view-selector/post-view-selector.component';
import { RouterLink } from '@angular/router';
import { FollowViewComponent } from '../../../Follow/Components/follow-view/follow-view.component';
import { getFolloweesPosts } from '../../actions/post.action';
import { ViewSelected } from '../../Models/view-selected.enum';
@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    RouterLink, 
    CommonModule, 
    PostItemComponent, 
    PostViewSelectorComponent,
    FollowViewComponent,
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: PostDto[] = [];
  private subscription: Subscription | undefined = undefined;

  viewSelected: ViewSelected = ViewSelected.FEED;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    // Suscríbete siempre al store para actualizar los posts según la vista
    this.subscription = this.store.select('postState').subscribe(postsState => {
      if (this.viewSelected === ViewSelected.MYPOSTS) {
        this.posts = postsState.myPosts;
      } else if (this.viewSelected === ViewSelected.FEED) {
        this.posts = postsState.followersPosts;
      } 
    });
    // Carga la vista inicial si es necesario
    if (this.viewSelected === ViewSelected.FEED) {
      this.loadFollowingPosts();
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onViewChange(view: ViewSelected) {
    this.viewSelected = view;
    if (view === ViewSelected.MYPOSTS) {
      this.loadPosts();
    } else if (view === ViewSelected.FEED) {
      this.loadFollowingPosts();
    } 
  }

  loadPosts() {
    this.store.dispatch(getMyPosts());
  }

  loadFollowingPosts() {
    this.store.dispatch(getFolloweesPosts());
  }
}