import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { provideEffects } from '@ngrx/effects';
import { ArtistEffects } from './Artists/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { AlbumsEffects } from './Albums/effects';
import { TrackEffects } from './Tracks/effects';
import { PlaylistEffects } from './Playlists/effects';
import { AuthEffects } from './Auth/effects/auth.effects';
import { UsersEffects } from './Users/effects/users.effects';
import { authInterceptor } from './Auth/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(appReducers),
    provideEffects([
      ArtistEffects,
      AlbumsEffects,
      TrackEffects,
      PlaylistEffects,
      AuthEffects,
      UsersEffects,
    ]),
    provideStoreDevtools({ maxAge: 25, logOnly: environment.production }),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
