import { Component, effect, ElementRef, EnvironmentInjector, inject, input, OnDestroy, OnInit, runInInjectionContext, signal, ViewChild, ViewEncapsulation } from "@angular/core";
import { WordCloud } from "./wordCloud";
import { Size, Words } from "./wordCloud.type";
import { IsLoadingDirective } from "../../supporting/directives/isLoading/isLoading/isLoading.directive";

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
  words = input.required<Words>();

  @ViewChild("wordCloudSvg", { static: true }) private wordCloudSvgRef!: ElementRef<SVGElement>;

  protected isLoading = signal(false);
  private environmentInjector = inject(EnvironmentInjector);

  private wordCloud: WordCloud | null = null;
  private sizeObserver?: ResizeObserver;

  ngOnInit(): void {
    this.sizeObserver = new ResizeObserver(entries => {
      const size: Size = {
        width: entries[0].contentRect.width,
        height: entries[0].contentRect.height,
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
        })
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