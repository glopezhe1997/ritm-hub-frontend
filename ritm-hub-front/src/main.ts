import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const providers = [
  ...(appConfig?.providers ?? []),
  provideHttpClient(),
  // ...otros providers como NgRx...
];

bootstrapApplication(AppComponent, { ...appConfig, providers })
  .catch((err) => console.error(err));
// ...existing code...