import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { provideEffects } from '@ngrx/effects';
import { ArtistEffects } from './Artists/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(appReducers),
    provideEffects([ArtistEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: environment.production }) // DevTools opcional
  ],
};
