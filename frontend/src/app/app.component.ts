import { Component, inject, ViewEncapsulation } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { StepperModule } from 'primeng/stepper';
import { appPrimeNGTheme } from './primeNG.theme';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    StepperModule,
    RouterModule,
    AsyncPipe
  ],
})
export class AppComponent {
  private primeNGConfig = inject(PrimeNGConfig);
  private router = inject(Router);
  private readonly routesOfSteps = ["/about", "/surname-forge", "/survey"] as const;

  protected activeStep$: Observable<number> = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map((event: NavigationEnd) => {
      const activeStep = this.routesOfSteps.findIndex(p => event.urlAfterRedirects.startsWith(p));
      return activeStep === -1 ? 0 : activeStep; 
    })
  );

  constructor() {
    this.primeNGConfig.theme.set({ preset: appPrimeNGTheme });
    this.primeNGConfig.ripple.set(true); // in onInit?
  }

  protected handleActiveStepChange(activeStep: number) {
    const newRoute = this.routesOfSteps[activeStep];
    this.router.navigateByUrl(newRoute);
  }
}
