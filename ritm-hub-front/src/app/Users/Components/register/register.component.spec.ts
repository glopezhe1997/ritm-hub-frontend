import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { registerUser } from '../../actions/users.action';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, ReactiveFormsModule],
      providers: [provideMockStore()]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.registerForm.valid).toBeFalse();
  });

  it('should dispatch registerUser when form is valid and submitted', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.registerForm.setValue({
      username: 'testuser',
      name: 'Test Name',
      Birthdate: '2000-01-01',
      email: 'test@mail.com',
      password: 'password123'
    });

    component.onSubmit();

    expect(dispatchSpy).toHaveBeenCalledWith(
      registerUser({
        user: {
          username: 'testuser',
          name: 'Test Name',
          Birthdate: new Date('2000-01-01'),
          email: 'test@mail.com',
          password: 'password123'
        }
      })
    );
  });

  it('should not dispatch if form is invalid', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.registerForm.setValue({
      username: '',
      name: '',
      Birthdate: '',
      email: '',
      password: ''
    });

    component.onSubmit();

    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('should show error for invalid email', () => {
    const emailInput = component.email;
    emailInput.setValue('invalid-email');
    emailInput.markAsTouched();
    fixture.detectChanges();
    
    const errorMsg = fixture.debugElement.nativeElement.querySelector('.text-red-500 span');
    expect(emailInput.invalid).toBeTrue();
    expect(errorMsg.textContent).toContain('Invalid email address.');
  });

  it('should show error for short password', () => {
    const passwordInput = component.password;
    passwordInput.setValue('short');
    passwordInput.markAsTouched();
    fixture.detectChanges();
  
    expect(passwordInput.invalid).toBeTrue();
    const errorMsg = fixture.debugElement.nativeElement.querySelector('.text-red-500 span');
    expect(errorMsg.textContent).toContain('Minimum 8 characters.');
  });
  
  it('should show error for long password', () => {
    const passwordInput = component.password;
    passwordInput.setValue('a'.repeat(17));
    passwordInput.markAsTouched();
    fixture.detectChanges();
  
    expect(passwordInput.invalid).toBeTrue();
    const errorMsg = fixture.debugElement.nativeElement.querySelector('.text-red-500 span');
    expect(errorMsg.textContent).toContain('Maximum 16 characters.');
  });

  it('should disable submit button when form is invalid', () => {
    component.registerForm.setValue({
      username: '',
      name: '',
      Birthdate: '',
      email: '',
      password: ''
    });
    fixture.detectChanges();
  
    const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBeTrue();
  });

});