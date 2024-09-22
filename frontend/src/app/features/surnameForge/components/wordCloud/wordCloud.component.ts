import { Component, effect, ElementRef, EnvironmentInjector, inject, input, OnDestroy, OnInit, runInInjectionContext, signal, ViewChild, ViewEncapsulation } from "@angular/core";
import { SvgSize, WordCloud } from "./wordCloud";
import { IsLoadingDirective } from "../../../../supporting/directives/isLoading/isLoading/isLoading.directive";
import { WordCloudItem } from "@surename-forge/shared";

@Component({
  selector: "app-word-cloud",
  templateUrl: "wordCloud.component.html",
  styleUrl: "wordCloud.component.css",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    IsLoadingDirective,
  ]
})
export class WordCloudComponent implements OnInit, OnDestroy {
  words = input.required<WordCloudItem[]>();

  @ViewChild("wordCloudSvg", { static: true }) private wordCloudSvgRef!: ElementRef<SVGElement>;

  protected isLoading = signal(false);
  private environmentInjector = inject(EnvironmentInjector);

  private wordCloud: WordCloud | null = null;
  private sizeObserver: ResizeObserver | null = null;

  ngOnInit(): void {
    this.sizeObserver = new ResizeObserver(entries => {
      const size: SvgSize = {
        widthInPx: entries[0].contentRect.width,
        heightInPx: entries[0].contentRect.height,
      }

      if (this.wordCloud === null) {
        this.wordCloud = new WordCloud(
          size,
          this.wordCloudSvgRef.nativeElement,
          () => this.isLoading.set(true),
          () => this.isLoading.set(false),
        );    
        
        runInInjectionContext(this.environmentInjector, () => {
          effect(() => {
            this.wordCloud!.render(this.words());
          }, { allowSignalWrites: true }); // render sets isLoading before and after render. Therefore, we need to allow write signals
        });
      } else {
        this.wordCloud.resize(size, this.words())
      }
    });
    this.sizeObserver.observe(this.wordCloudSvgRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.sizeObserver?.disconnect();
    this.wordCloud?.destroy();
  }
}
