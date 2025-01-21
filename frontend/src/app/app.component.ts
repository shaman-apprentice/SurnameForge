import { Component, inject, ViewEncapsulation } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ToolbarModule } from 'primeng/toolbar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { GlobalLoadingService } from './services/globalLoading.service';
import { IsLoadingDirective } from './supporting/directives/isLoading/isLoading/isLoading.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
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
export class AppComponent {
  protected globalLoadingService = inject(GlobalLoadingService);

  private router = inject(Router);
  private readonly routesOfSteps = ["/about", "/surname-forge", "/survey"] as const;

  protected activeStep$: Observable<number> = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map((event: NavigationEnd) => {
      const activeStep = this.routesOfSteps.findIndex(p => event.urlAfterRedirects.startsWith(p));
      return activeStep === -1 ? 0 : activeStep; 
    })
  );

  protected handleActiveStepChange(activeStep: number) {
    const newRoute = this.routesOfSteps[activeStep];
    this.router.navigateByUrl(newRoute);
  }
}
