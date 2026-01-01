import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostItemComponent } from './post-item.component';
import { PostDto } from '../../Models/post.dto';
import { PostStatus } from '../../Models/post-status.enum';
import { By } from '@angular/platform-browser';

describe('PostItemComponent', () => {
  let component: PostItemComponent;
  let fixture: ComponentFixture<PostItemComponent>;

  const mockPost: PostDto = {
    post_id: 1,
    title: 'Test Post',
    content: 'This is a test post',
    status: PostStatus.HAPPY,
    owner: {
      id: 1,
      username: 'testuser',
      email: 'test@mail.com',
      name: 'Test User',
      role: 'user',
      createdAt: new Date(),
      Birthdate: new Date(),
    },
    createdAt: new Date('2024-01-01T00:00:00Z'),
    track: {
      id: 10,
      title: 'Test Track',
      album: {
        name: 'Test Album',
        images: [{ url: 'track.jpg', height: 100, width: 100 }]
      },
      artists: [{ name: 'Artist' }],
      duration_ms: 123000,
      popularity: 50,
      preview_url: 'url',
      external_id: 'extid'
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PostItemComponent);
    component = fixture.componentInstance;
    component.post = mockPost;
    component.postId = mockPost.post_id;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render post title, content, status, date, owner and track', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Test Post');
    expect(compiled.querySelector('p').textContent).toContain('This is a test post');
    expect(compiled.querySelector('span.bg-yellow-400').textContent).toContain('Happy');
    expect(compiled.textContent).toContain('Jan 1, 2024'); // mediumDate
    expect(compiled.textContent).toContain('testuser');
    expect(compiled.textContent).toContain('Test Track');
  });

  it('should use track image if available', () => {
    const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(img.src).toContain('track.jpg');
    expect(img.alt).toContain('Test Track');
  });

  it('should use placeholder image if no track image', () => {
    component.post = { ...mockPost, track: undefined };
    fixture.detectChanges();
    const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(img.src).toContain('assets/images/placeholder.jpg');
  });

  it('should not render edit/delete buttons if myPosts is false', () => {
    component.myPosts = false;
    fixture.detectChanges();
    const editBtn = fixture.nativeElement.querySelector('button[title="Edit"]');
    const deleteBtn = fixture.nativeElement.querySelector('button[title="Delete"]');
    expect(editBtn).toBeNull();
    expect(deleteBtn).toBeNull();
  });

  it('should render edit/delete buttons if myPosts is true', () => {
    component.myPosts = true;
    fixture.detectChanges();
    const editBtn = fixture.nativeElement.querySelector('button[title="Edit"]');
    const deleteBtn = fixture.nativeElement.querySelector('button[title="Delete"]');
    expect(editBtn).not.toBeNull();
    expect(deleteBtn).not.toBeNull();
  });

  it('should emit onEdit when edit button is clicked', () => {
    component.myPosts = true;
    fixture.detectChanges();
    spyOn(component.onEdit, 'emit');
    const editBtn = fixture.debugElement.query(By.css('button[title="Edit"]'));
    editBtn.nativeElement.click();
    expect(component.onEdit.emit).toHaveBeenCalledWith(mockPost.post_id);
  });

  it('should emit onDelete when delete button is clicked', () => {
    component.myPosts = true;
    fixture.detectChanges();
    spyOn(component.onDelete, 'emit');
    const deleteBtn = fixture.debugElement.query(By.css('button[title="Delete"]'));
    deleteBtn.nativeElement.click();
    expect(component.onDelete.emit).toHaveBeenCalledWith(mockPost.post_id);
  });
});