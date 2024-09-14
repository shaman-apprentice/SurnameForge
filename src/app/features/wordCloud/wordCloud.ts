import * as d3 from "d3";
import cloud from "d3-cloud";
import { Words } from "./words.type";
import { getColors } from "./utils/color.helper";

// todo loading indicator
// todo calc weights for words
// todo ensure all words are rendered
// todo ensure size diff to next element is always smaller than 25%?
// todo dynamic size input and map to svg
// todo investigate why d3-cloud@1.2.5 works but d3-cloud@1.2.7 has a lot of overlaps
export class WordCloud {
  private readonly font = "Impact";
  private readonly colors = getColors([255, 255, 255]);
  private wordCloudTarget: d3.Selection<any, any, any, any>;
  private size = {
    width: 500,
    height: 500,
  }

  constructor(svg: SVGElement) {
    this.wordCloudTarget = d3.select(svg)
      .append("g")
      .attr("transform", "translate(" + this.size.width / 2 + "," + this.size.height / 2 + ")");
  }

  render = async (words: Words) => {
    return new Promise<void>(resolve => {
      console.log(this.size.width, this.size.height)
      // @ts-ignore
      const renderProcess = cloud()
        .size([this.size.width, this.size.height])
        .words([...words.entries()].map(([word, frequency]) => ({
          text: word,
          size: 10 + Math.round(Math.random() * 80),
        })))
        .padding(5)
        .rotate(() => ~~(Math.random() * 2) * 90)
        .font(this.font) 
        .fontSize(d => d.size!)
        .timeInterval(100)
        .on("end", d => {
          if (words.size > d.length)
            console.warn(`Could not place all words: Given ${words.size} but placed ${d.length}`);

          this.draw(d);
          resolve();
        });

        renderProcess.start();
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
