import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./Shared/header/header.component";
import { Store } from '@ngrx/store';
import { loadToken } from './Auth/actions/auth.action';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ritm-hub-front';

  constructor(private store: Store) {}

  ngOnInit() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.store.dispatch(loadToken({ access_token: token }));
    }
  }
}