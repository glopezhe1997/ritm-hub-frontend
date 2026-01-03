import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../app.reducer'; // Ajusta la ruta si es necesario
import { UserDto } from '../../models/user.dto';
import { UpdateUserDto } from '../../models/update-user.dto';
import { updateUser } from '../../actions/users.action';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  user$: Observable<UserDto | null>;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    // Selecciona el usuario actual del store
    this.user$ = this.store.pipe(select(state => state.authState.user));
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (user) {
        this.profileForm = this.fb.group({
          username: [user.username, [Validators.required]],
          name: [user.name, [Validators.required]],
          Birthdate: [user.Birthdate ? new Date(user.Birthdate).toISOString().substring(0, 10) : '', [Validators.required]],
          email: [user.email, [Validators.required, Validators.email]],
          password: ['', [Validators.minLength(8), Validators.maxLength(16)]],
          confirmPassword: ['']
        }, { validators: this.passwordsMatchValidator });
      }
    });
  }

  get username() { return this.profileForm.get('username'); }
  get name() { return this.profileForm.get('name'); }
  get Birthdate() { return this.profileForm.get('Birthdate'); }
  get email() { return this.profileForm.get('email'); }
  get password() { return this.profileForm.get('password'); }
  get confirmPassword() { return this.profileForm.get('confirmPassword'); }

  onSubmit() {
    if (this.profileForm.invalid) {
      return;
    }
    this.loading = true;

    this.user$.subscribe(user => {
      if (user) {
        const { confirmPassword, ...formValue } = this.profileForm.value;
        const updateData: UpdateUserDto = {
          ...formValue,
          Birthdate: new Date(this.profileForm.value.Birthdate)
        };
        if (!updateData.password) {
          delete updateData.password;
        }

        this.store.dispatch(updateUser({ userId: user.id, updateData }));
        this.loading = false;
      }
    }).unsubscribe();
  }

  passwordsMatchValidator(form: FormGroup) {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordsMismatch: true };
}
}