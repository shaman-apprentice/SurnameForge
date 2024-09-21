import * as d3 from "d3";
import cloud from "d3-cloud";
import { Size, Words } from "../../wordCloud.type";
import { getColors } from "./utils/color.helper";
import { CalculateWordPositions, calculateWordPositions, PositionedWords } from "./utils/wordCloud.retrier";
import { debounceTime, Observable, Subject, Subscription, switchMap, tap } from "rxjs";

// todo better UX when not all words could be placed
// todo investigate why d3-cloud@1.2.5 works but d3-cloud@1.2.7 has a lot of overlaps
export class WordCloud {
  private readonly font = "Impact";
  private readonly colors = getColors([255, 255, 255]);
  private readonly startBaseFontSize = 24;
  private baseFontSize = this.startBaseFontSize;
  private wordCloudTarget: d3.Selection<any, any, any, any>;
  private ongoingCalculation: ReturnType<typeof cloud> | null = null;
  private words$: Subject<Words>;
  private renderProcess: Subscription;

  constructor(
    private size: Size,
    svg: SVGElement,
    beforeRenderCallback: (wordsToRender: Words) => void,
    afterRenderCallback: (renderedWords: PositionedWords) => void
  ) {
    this.wordCloudTarget = d3.select(svg)
      .append("g")
      .attr("transform", `translate(${this.size.width/2},${this.size.height/2})`);

    this.words$ = new Subject();
    this.renderProcess = this.words$.pipe(
      tap((words) => beforeRenderCallback(words)),
      debounceTime(100),
      switchMap(words => calculateWordPositions(this.calculateWordPositions, words, this.baseFontSize)),
      tap((positionedWords: PositionedWords) => {
        this.draw(positionedWords.placedWords);
        this.baseFontSize = positionedWords.baseFontSize;

        afterRenderCallback(positionedWords);

        if (!positionedWords.couldPlaceAllWords)
          console.warn("Attention, not all words could be placed - sorry, this product is still in beta");
      })
    ).subscribe();
  }

  destroy() {
    this.renderProcess.unsubscribe();
  }

  /** Gets debounced by 100ms and will only last call to render will be put to screen. */
  render(words: Words) {
    this.words$.next(words);
  }

  async resize(size: Size, words: Words) {
    this.size = size;
    this.baseFontSize = this.startBaseFontSize;
    this.wordCloudTarget
      .attr("transform", `translate(${this.size.width/2},${this.size.height/2})`);

    return this.render(words);
  }

  private calculateWordPositions: CalculateWordPositions = (words, baseFontSize) => {
    return new Observable(observer => {
      if (this.ongoingCalculation)
        // no need to complete previous observer, as we use switchMap in renderProcess
        this.ongoingCalculation.stop();

      this.ongoingCalculation = cloud()
        .size([this.size.width, this.size.height])
        .words(words)
        .padding(5)
        .rotate(() => Math.floor(Math.random() * 60) - 30)
        .font(this.font) 
        .fontSize(d => d.size!)
        .timeInterval(100)
        .on("end", d => {
          this.ongoingCalculation = null;
          observer.next({
            couldPlaceAllWords: words.length === d.length,
            placedWords: d,
            baseFontSize,
          });
          observer.complete();
        });

      this.ongoingCalculation.start();
    });
  } 

  private draw(words: cloud.Word[]) {
    this.wordCloudTarget.selectAll("text").remove();

    this.wordCloudTarget.selectAll("text").data(words).enter().append("text")
      .text(d => d.text!)
      .style("font-size", d => d.size + "px")
      .style("font-family", this.font)
      .style("fill", (d, i) => this.colors[i % this.colors.length])
      .attr("text-anchor", "middle")
      .attr("transform", d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
  }
}
