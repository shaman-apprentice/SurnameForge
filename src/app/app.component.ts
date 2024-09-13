import { AfterViewInit, Component, inject } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { appPrimeNGTheme } from './primeNG.theme';
import { WordCloud } from './wordCloud';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    StepperModule,
    ButtonModule
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {
  title = 'SurnameForge';

  private primeNGConfig = inject(PrimeNGConfig);

  constructor() {
    this.primeNGConfig.theme.set({ preset: appPrimeNGTheme });
    this.primeNGConfig.ripple.set(true); // in onInit?
  }

  ngAfterViewInit(): void {
    new WordCloud().render();
  }
}
