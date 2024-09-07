import { Component, inject } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { appPrimeNGTheme } from './primeNG.theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    StepperModule,
    ButtonModule
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'SurnameForge';

  private primeNGConfig = inject(PrimeNGConfig);

  constructor() {
    this.primeNGConfig.theme.set({ preset: appPrimeNGTheme });
    this.primeNGConfig.ripple.set(true); // in onInit?
  }
}
