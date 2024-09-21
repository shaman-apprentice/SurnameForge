import * as d3 from "d3";
import cloud from "d3-cloud";
import { Size, Words } from "./wordCloud.type";
import { getColors } from "./utils/color.helper";
import { CalculateWordPositions, calculateWordPositionsWithRetry } from "./utils/wordCloud.retrier";

// todo better UX when not all words could be placed
// todo investigate why d3-cloud@1.2.5 works but d3-cloud@1.2.7 has a lot of overlaps
export class WordCloud {
  private readonly font = "Impact";
  private readonly colors = getColors([255, 255, 255]);
  private readonly startBaseFontSize = 24;
  private baseFontSize = this.startBaseFontSize;
  private wordCloudTarget: d3.Selection<any, any, any, any>;
  private ongoingCalculation: ReturnType<typeof cloud> | null = null;

  constructor(private size: Size, svg: SVGElement) {
    this.wordCloudTarget = d3.select(svg)
      .append("g")
      .attr("transform", `translate(${this.size.width/2},${this.size.height/2})`);
  }

  render = async (words: Words) => {
    const positionedWords = await calculateWordPositionsWithRetry(
      this.calculateWordPositions,
      words,
      this.baseFontSize
    );

    this.baseFontSize = positionedWords.baseFontSize;
    this.draw(positionedWords.placedWords);
    if (!positionedWords.couldPlaceAllWords)
      alert("Attention, not all words could be placed - sorry, this product is still in beta");
  }

  async resize(size: Size, words: Words) {
    this.size = size;
    this.baseFontSize = this.startBaseFontSize;
    this.wordCloudTarget
      .attr("transform", `translate(${this.size.width/2},${this.size.height/2})`);

    await new Promise(resolve => setTimeout(resolve, 3000))
    return this.render(words);
  }

  private calculateWordPositions: CalculateWordPositions = (words, baseFontSize) => {
    return new Promise(resolve => {
      if (this.ongoingCalculation) {
        this.ongoingCalculation.stop();
        this.ongoingCalculation = null;
      }

      this.ongoingCalculation = cloud()
        .size([this.size.width, this.size.height])
        .words(words)
        .padding(5)
        .rotate(() => ~~(Math.random() * 2) * 90)
        .font(this.font) 
        .fontSize(d => d.size!)
        .timeInterval(100)
        .on("end", d => {
          // todo this may still get called, although stopped was called - prevent drawing in that case!
          this.ongoingCalculation = null;
          resolve({
            couldPlaceAllWords: words.length === d.length,
            placedWords: d,
            baseFontSize
          })
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
