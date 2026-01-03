import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { login } from '../../actions';
import { By } from '@angular/platform-browser';
import { SignInDto } from '../../Models/sign-in.dto';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [provideMockStore()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when empty', () => {
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should show validation errors for invalid email', () => {
    component.email.setValue('invalid-email');
    component.email.markAsTouched();
    fixture.detectChanges();
    const errorMsg = fixture.debugElement.query(By.css('.text-red-500')).nativeElement.textContent;
    expect(errorMsg).toContain('Invalid email address');
  });

  it('should show validation errors for short password', () => {
    component.email.setValue('test@email.com');
    component.password.setValue('short');
    component.password.markAsTouched();
    fixture.detectChanges();
    const errorMsg = fixture.debugElement.query(By.css('.text-red-500')).nativeElement.textContent;
    expect(errorMsg).toContain('Minimum 8 characters');
  });

  it('should enable submit button only when form is valid', () => {
    component.email.setValue('test@email.com');
    component.password.setValue('12345678');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(button.disabled).toBeFalse();
  });

  it('should dispatch login action with credentials on submit', () => {
    spyOn(store, 'dispatch');
    component.email.setValue('test@email.com');
    component.password.setValue('12345678');
    fixture.detectChanges();
  
    component.onSubmit();
  
    const expectedDto = new SignInDto('test@email.com', '12345678');
    expect(store.dispatch).toHaveBeenCalledWith(
      login({ credentials: expectedDto })
    );
  });

  it('should not dispatch login if form is invalid', () => {
    spyOn(store, 'dispatch');
    component.email.setValue('');
    component.password.setValue('');
    fixture.detectChanges();

    component.onSubmit();

    expect(store.dispatch).not.toHaveBeenCalled();
  });
});