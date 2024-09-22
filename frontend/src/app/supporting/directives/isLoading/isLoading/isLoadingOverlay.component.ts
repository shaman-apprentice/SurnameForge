import { Component, Input, ViewEncapsulation } from "@angular/core";
import type { BlockableUI } from "primeng/api";
import { BlockUIModule } from "primeng/blockui";
import { ProgressSpinnerModule } from "primeng/progressspinner";

@Component({
  selector: "app-loading-overlay",
  templateUrl: "isLoadingOverlay.component.html",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    ProgressSpinnerModule,
    BlockUIModule,
  ]
})
export class LoadingOverlayComponent {
  @Input({ required: true }) target!: BlockableUI;
  @Input({ required: true }) isLoading!: boolean;
}
