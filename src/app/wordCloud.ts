import * as d3 from "d3";
import cloud from "d3-cloud";

export class WordCloud {
  private layout: ReturnType<typeof cloud> = cloud()
    .size([500, 500])
    .words([
      "Hello", "world", "normally", "you", "want", "more", "words",
      "than", "this"].map(function(w, i) {
      return {text: w, size: 10 + Math.random() * 90, index: i,};
    }))
    .padding(5)
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .fontSize(function(d) { return d.size!; })
    .timeInterval(100)
    .on("end", (words) => this.draw(words));

  render() {
    this.layout.start()
    // todo promisify and loading indicator
    // todo weights for words
    // todo ensure all words are rendered
    // todo don't append to body / todo setup d3 / probably possibly to use existing svg?
    // todo ensure contrast of colors
  }

  private draw(words: cloud.Word[]) {
    const colors = d3.schemeSpectral.flatMap(colors => colors);

    d3.select("body").append("svg")
        .attr("width", this.layout.size()[0])
        .attr("height", this.layout.size()[1])
      .append("g")
        .attr("transform", "translate(" + this.layout.size()[0] / 2 + "," + this.layout.size()[1] / 2 + ")")
      .selectAll("text").data(words)
      .enter().append("text")
        .style("font-size", d => d.size + "px")
        .style("font-family", "Impact")
        // @ts-ignore
        .style("fill", d => colors[d["index"] % colors.length])
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(d => d.text!);
  }
}
