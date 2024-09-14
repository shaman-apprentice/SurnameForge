import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { WordCloud } from "./wordCloud";


const wc1 = new Map([
  ["Hello", 1],
  ["World", 2],
  ["everything", 1],
  ["awesome", 1],
]);

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
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class WordCloudComponent implements OnInit {
  @ViewChild("wordCloudSvg", { static: true }) private wordCloudSvgRef!: ElementRef<SVGElement>;

  private wordCloud!: WordCloud;

  ngOnInit(): void {
    this.wordCloud = new WordCloud(this.wordCloudSvgRef.nativeElement);
    this.wordCloud.render(wc2);
  }
}
