import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MockBackendInterceptor } from './core/services/mock-backend.interceptor';
import { Chart, registerables } from 'chart.js';
import { provideCharts } from 'ng2-charts';

Chart.register(...registerables);
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptorsFromDi()),
    MockBackendInterceptor,
    provideCharts(),
    
  ]
};
