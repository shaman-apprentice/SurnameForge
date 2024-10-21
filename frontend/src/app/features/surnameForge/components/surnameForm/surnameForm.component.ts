import { Component, inject, input, OnInit, signal, ViewEncapsulation } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { SurnameWordCloudService } from "./surnameWordCloud.service";
import { WordCloudComponent } from "../wordCloud/wordCloud.component";
import { IsLoadingDirective } from "../../../../supporting/directives/isLoading/isLoading/isLoading.directive";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from "@angular/forms";
import { WordCloudItem } from "@surename-forge/shared";

@Component({
  selector: "app-surname-form",
  templateUrl: "surnameForm.component.html",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    WordCloudComponent,
    IsLoadingDirective,
    ButtonModule,
    InputTextModule,
    FormsModule,
  ]
})
export class SurnameFormComponent implements OnInit {
  surname = input.required<string>();
  
  protected words = signal<WordCloudItem[]>([]);
  protected isLoading = true;
  protected newWord = "";

  private wordCloud = inject(SurnameWordCloudService);
  
  async ngOnInit() {
    try {
      this.isLoading = true;
      const words = await firstValueFrom(this.wordCloud.getWords(this.surname()));
      this.words.set(words);
    } finally {
      this.isLoading = false;
    }
  }

  protected async addWord() {
    if (this.newWord.length < 3)
      return; // todo give user some hint

    try {
      this.isLoading = true;
      const newWords = await firstValueFrom(this.wordCloud.addWord(this.surname(), this.newWord));
      this.words.set(newWords);
      this.newWord = "";
    } finally {
      this.isLoading = false;
    }
  }
}
