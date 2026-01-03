import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostListComponent } from './post-list.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { PostDto } from '../../Models/post.dto';
import { ViewSelected } from '../../Models/view-selected.enum';
import { By } from '@angular/platform-browser';
import { getMyPosts, getFolloweesPosts } from '../../actions/post.action';
import { PostStatus } from '../../Models/post-status.enum';
import { provideRouter } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let store: MockStore;

  const mockPost: PostDto = {
    post_id: 1,
    title: 'Test Post',
    content: 'Content',
    status: PostStatus.HAPPY,
    owner: {
      id: 1,
      username: 'user',
      email: 'user@mail.com',
      name: 'User',
      role: 'user',
      createdAt: new Date(),
      Birthdate: new Date(),
    },
    createdAt: new Date('2024-01-01T00:00:00Z'),
    track: {
      id: 10,
      title: 'Track',
      album: { name: 'Album', images: [{ url: 'img.jpg', height: 100, width: 100 }] },
      artists: [{ name: 'Artist' }],
      duration_ms: 123000,
      popularity: 50,
      preview_url: 'url',
      external_id: 'extid'
    }
  };

  const initialState = {
    postState: {
      myPosts: [mockPost],
      followersPosts: [mockPost]
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PostListComponent,
        HttpClientTestingModule
    ],
      providers: [
        provideMockStore({ initialState }),
        provideRouter([])
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render feed posts when viewSelected is FEED', () => {
    component.viewSelected = ViewSelected.FEED;
    fixture.detectChanges();
    const items = fixture.debugElement.queryAll(By.css('app-post-item'));
    expect(items.length).toBe(1);
    expect(items[0].componentInstance.myPosts).toBe(false);
  });

  it('should render my posts when viewSelected is MYPOSTS', () => {
    component.viewSelected = ViewSelected.MYPOSTS;
    fixture.detectChanges();
    const items = fixture.debugElement.queryAll(By.css('app-post-item'));
    expect(items.length).toBe(1);
    expect(items[0].componentInstance.myPosts).toBe(true);
  });

  it('should render follow view when viewSelected is FOLLOWING', () => {
    component.viewSelected = ViewSelected.FOLLOWING;
    fixture.detectChanges();
    const followView = fixture.debugElement.query(By.css('app-follow-view'));
    expect(followView).toBeTruthy();
  });

  it('should dispatch getMyPosts when switching to MYPOSTS', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.onViewChange(ViewSelected.MYPOSTS);
    expect(dispatchSpy).toHaveBeenCalledWith(getMyPosts());
  });

  it('should dispatch getFolloweesPosts when switching to FEED', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.onViewChange(ViewSelected.FEED);
    expect(dispatchSpy).toHaveBeenCalledWith(getFolloweesPosts());
  });

  it('should update posts when store changes', () => {
    component.viewSelected = ViewSelected.MYPOSTS;
    store.setState({
      postState: {
        myPosts: [mockPost, { ...mockPost, post_id: 2, title: 'Another Post' }],
        followersPosts: []
      }
    });
    store.refreshState();
    fixture.detectChanges();
    expect(component.posts.length).toBe(2);
    expect(component.posts[1].title).toBe('Another Post');
  });
});