import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { CreateUserDto } from '../../models/create-user.dto';
import { registerUser } from '../../actions/users.action';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  username: FormControl;
  name: FormControl;
  Birthdate: FormControl;
  email: FormControl;
  password: FormControl;
  errorMessage: string = '';

  constructor(
    private store: Store,
    private formBuilder: FormBuilder
  ) {
    this.username = new FormControl('', [Validators.required]);
    this.name = new FormControl('', [Validators.required]);
    this.Birthdate = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]);

    this.registerForm = this.formBuilder.group({
      username: this.username,
      name: this.name,
      Birthdate: this.Birthdate,
      email: this.email,
      password: this.password,
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    const { username, name, Birthdate, email, password } = this.registerForm.value;
    const user = { username, name, Birthdate: new Date(Birthdate), email, password } as CreateUserDto;
    this.store.dispatch(registerUser({ user }));
  }
}