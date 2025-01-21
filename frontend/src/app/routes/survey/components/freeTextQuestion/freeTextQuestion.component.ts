import { Component, Input, ViewEncapsulation } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: "app-free-text-question",
  templateUrl: "freeTextQuestion.component.html",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    TextareaModule,
    ReactiveFormsModule
    ,
  ]
})
export class FreeTextQuestionComponent {
  @Input({ required: true }) question!: string;
  @Input({ required: true }) control!: FormControl<string | null>
}
