import { ComponentRef, Directive, ElementRef, inject, Input, OnDestroy, ViewContainerRef } from "@angular/core";
import { LoadingOverlayComponent } from "./isLoadingOverlay.component";


@Directive({
  selector: "[isLoading]",
  standalone: true,
})
export class IsLoadingDirective implements OnDestroy {
  // Don't use signals here due to https://github.com/angular/angular/issues/55808
  @Input({ required: true }) set isLoading(value: boolean) {
    this.getLoadingOverlay().setInput("isLoading", value)

    setTimeout(() => {
      this.getLoadingOverlay().setInput("isLoading", null)
    }, 4000)
  }

  private viewContainerRef = inject(ViewContainerRef);
  private elementRef = inject(ElementRef);

  private loadingOverlayRef!: ComponentRef<LoadingOverlayComponent>;

  ngOnDestroy(): void {
    this.loadingOverlayRef?.destroy();
  }

  private getLoadingOverlay(): ComponentRef<LoadingOverlayComponent> {
    if (!this.loadingOverlayRef) {
      this.loadingOverlayRef = this.viewContainerRef.createComponent(LoadingOverlayComponent);
      this.loadingOverlayRef.setInput("target", { 
        getBlockableElement: () => this.elementRef.nativeElement
      });
    }

    return this.loadingOverlayRef;
  }
}
