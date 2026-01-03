import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FollowViewComponent } from './follow-view.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { UsersService } from '../../../Users/services/users.service';
import { of, throwError } from 'rxjs';
import { UserDto } from '../../../Users/models/user.dto';
import { followUser, unfollowUser, getFollowingUsers } from '../../actions/follow.action';
import { By } from '@angular/platform-browser';

describe('FollowViewComponent', () => {
  let component: FollowViewComponent;
  let fixture: ComponentFixture<FollowViewComponent>;
  let store: MockStore;
  let usersServiceSpy: jasmine.SpyObj<UsersService>;

  const mockUser: UserDto = {
    id: 1,
    name: 'Test User',
    email: 'test@email.com',
    username: 'testuser',
    Birthdate: new Date('2000-01-01'),
    role: 'user',
    createdAt: new Date('2024-01-01'),
    isActive: true,
    isBlocked: false
  };

  const initialState = {
    authState: { user: { id: 1 } },
    followState: { usersFollowing: [mockUser], loading: false }
  };

  beforeEach(async () => {
    usersServiceSpy = jasmine.createSpyObj('UsersService', ['searchUsers']);

    await TestBed.configureTestingModule({
      imports: [FollowViewComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: UsersService, useValue: usersServiceSpy }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(FollowViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getFollowingUsers on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(getFollowingUsers({ userId: 1 }));
  });

  it('should show "No results" when users is empty and not loading', () => {
    component.users = [];
    component.loading = false;
    fixture.detectChanges();
    const noResults = fixture.debugElement.query(By.css('.text-center.py-4.text-gray-400'));
    expect(noResults.nativeElement.textContent).toContain('No results');
  });

  it('should show loading indicator when loading', () => {
    component.loading = true;
    fixture.detectChanges();
    const loading = fixture.debugElement.query(By.css('.text-center.py-4')); //No pongo la clase -[#C16EFC] porque tailwing no está permitido en los tests
    expect(loading.nativeElement.textContent).toContain('Searching...');
  });

  it('should call usersService.searchUsers and update users on search', fakeAsync(() => {
    const users = [
      { ...mockUser, id: 2, username: 'other', email: 'other@email.com' }
    ];
    usersServiceSpy.searchUsers.and.returnValue(of(users));
    component.onSearch('other');
    tick();
    expect(usersServiceSpy.searchUsers).toHaveBeenCalledWith('other');
    expect(component.users).toEqual(users);
    expect(component.loading).toBeFalse();
  }));

  it('should clear users and loading on search error', fakeAsync(() => {
    usersServiceSpy.searchUsers.and.returnValue(throwError(() => new Error('fail')));
    component.onSearch('fail');
    tick();
    expect(component.users).toEqual([]);
    expect(component.loading).toBeFalse();
  }));

  it('should dispatch followUser when onFollowChange is called with true', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.onFollowChange(mockUser, true);
    expect(dispatchSpy).toHaveBeenCalledWith(followUser({ followData: { followee_Id: mockUser.id } }));
  });

  it('should dispatch unfollowUser when onFollowChange is called with false', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.onFollowChange(mockUser, false);
    expect(dispatchSpy).toHaveBeenCalledWith(unfollowUser({ followData: { followee_Id: mockUser.id } }));
  });

  it('should return true from isFollowing if user is in followingIds', () => {
    component.followingIds = [1, 2, 3];
    expect(component.isFollowing(1)).toBeTrue();
    expect(component.isFollowing(4)).toBeFalse();
  });

  it('should render users with follow button when users are present', () => {
    component.users = [
      { ...mockUser, id: 2, username: 'other', email: 'other@email.com' }
    ];
    fixture.detectChanges();
    const userItems = fixture.debugElement.queryAll(By.css('ul li'));
    expect(userItems.length).toBe(1);
    expect(userItems[0].nativeElement.textContent).toContain('other');
  });

  it('should render followingUsers if users is empty', () => {
    component.users = [];
    component.followingUsers = [
      { ...mockUser, id: 3, username: 'followed', email: 'followed@email.com' }
    ];
    fixture.detectChanges();
    const userItems = fixture.debugElement.queryAll(By.css('ul li'));
    expect(userItems.length).toBe(1);
    expect(userItems[0].nativeElement.textContent).toContain('followed');
  });
});