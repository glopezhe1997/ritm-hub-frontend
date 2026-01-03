import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { updateUser } from '../../actions/users.action';
import { UserDto } from '../../models/user.dto';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let store: MockStore;

  const mockUser: UserDto = {
    id: 1,
    username: 'testuser',
    name: 'Test Name',
    Birthdate: new Date('2000-01-01'),
    email: 'test@mail.com',
    role: 'user',
    createdAt: new Date('2023-01-01')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent, ReactiveFormsModule],
      providers: [
        provideMockStore({
          initialState: {
            authState: { user: mockUser }
          }
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with user data', () => {
    expect(component.profileForm.value.username).toBe(mockUser.username);
    expect(component.profileForm.value.name).toBe(mockUser.name);
    expect(component.profileForm.value.Birthdate).toBe('2000-01-01');
    expect(component.profileForm.value.email).toBe(mockUser.email);
    expect(component.profileForm.value.password).toBe('');
    expect(component.profileForm.value.confirmPassword).toBe('');
  });

  it('should have invalid form when required fields are empty', () => {
    component.profileForm.setValue({
      username: '',
      name: '',
      Birthdate: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    expect(component.profileForm.invalid).toBeTrue();
  });

  it('should be invalid if passwords do not match', () => {
    component.profileForm.patchValue({
      password: 'password123',
      confirmPassword: 'differentPassword'
    });
    expect(component.profileForm.errors?.['passwordsMismatch']).toBeTrue();
    expect(component.profileForm.invalid).toBeTrue();
  });

  it('should dispatch updateUser with password if provided and matching', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.profileForm.setValue({
      username: 'newuser',
      name: 'New Name',
      Birthdate: '1999-12-31',
      email: 'new@mail.com',
      password: 'password123',
      confirmPassword: 'password123'
    });

    component.onSubmit();

    expect(dispatchSpy).toHaveBeenCalledWith(
      updateUser({
        userId: mockUser.id,
        updateData: {
          username: 'newuser',
          name: 'New Name',
          Birthdate: new Date('1999-12-31'),
          email: 'new@mail.com',
          password: 'password123'
        }
      })
    );
  });

  it('should dispatch updateUser without password if left blank', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.profileForm.setValue({
      username: 'newuser',
      name: 'New Name',
      Birthdate: '1999-12-31',
      email: 'new@mail.com',
      password: '',
      confirmPassword: ''
    });

    component.onSubmit();

    expect(dispatchSpy).toHaveBeenCalledWith(
      updateUser({
        userId: mockUser.id,
        updateData: {
          username: 'newuser',
          name: 'New Name',
          Birthdate: new Date('1999-12-31'),
          email: 'new@mail.com'
        }
      })
    );
  });

  it('should not dispatch updateUser if form is invalid', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.profileForm.setValue({
      username: '',
      name: '',
      Birthdate: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    component.onSubmit();

    expect(dispatchSpy).not.toHaveBeenCalled();
  });
});