import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { appPrimeNGTheme } from './primeNG.theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    providePrimeNG({
      theme: { preset: appPrimeNGTheme }
    }),
    provideRouter(routes),
    provideHttpClient(
      withFetch()
    ),
  ]
};
