import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
// import { MockBackendInterceptor } from './core/services/mock-backend.interceptor';
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
