import { Component, ElementRef, OnDestroy, OnInit, signal, ViewChild, ViewEncapsulation } from "@angular/core";
import { WordCloud } from "./wordCloud";
import { Size } from "./wordCloud.type";
import { IsLoadingDirective } from "../../supporting/directives/isLoading/isLoading/isLoading.directive";

const wc2 = new Map([
  ["Hello", 1],
  ["world", 1],
  ["normally", 1],
  ["you", 1],
  ["want", 1],
  ["more", 1],
  ["words", 1],
  ["than", 2],
  ["this", 1],
]);

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
  @ViewChild("wordCloudSvg", { static: true }) private wordCloudSvgRef!: ElementRef<SVGElement>;

  protected isLoading = signal(false);

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
        this.wordCloud.render(wc2)
      } else {
        this.wordCloud.resize(size, wc2)
      }
    });
    this.sizeObserver.observe(this.wordCloudSvgRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.sizeObserver?.disconnect();
    this.wordCloud?.destroy();
  }
}