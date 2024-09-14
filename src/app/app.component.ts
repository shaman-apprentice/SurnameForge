import { Component, inject } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { appPrimeNGTheme } from './primeNG.theme';
import { WordCloudComponent } from './features/wordCloud/wordCloud.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    StepperModule,
    ButtonModule,
    WordCloudComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private primeNGConfig = inject(PrimeNGConfig);

  constructor() {
    this.primeNGConfig.theme.set({ preset: appPrimeNGTheme });
    this.primeNGConfig.ripple.set(true); // in onInit?
  }
}
