import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { StepperModule } from 'primeng/stepper';
import { ToolbarModule } from 'primeng/toolbar';
import { appPrimeNGTheme } from './primeNG.theme';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { GlobalLoadingService } from './services/globalLoading.service';
import { IsLoadingDirective } from './supporting/directives/isLoading/isLoading/isLoading.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    RouterModule,
    AsyncPipe,
    StepperModule,
    ToolbarModule,
    IsLoadingDirective,
    AsyncPipe,
  ],
})
export class AppComponent implements OnInit {
  protected globalLoadingService = inject(GlobalLoadingService);

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
  }
  
  ngOnInit(): void {
    this.primeNGConfig.ripple.set(true);
  }

  protected handleActiveStepChange(activeStep: number) {
    const newRoute = this.routesOfSteps[activeStep];
    this.router.navigateByUrl(newRoute);
  }
}
