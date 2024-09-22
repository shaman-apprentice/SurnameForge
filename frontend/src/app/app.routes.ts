import { Routes } from '@angular/router';
import { AboutPage } from './routes/about/about.page';
import { SurnameForgePage } from './routes/surnameForge/surnameForge.page';
import { SurveyPage } from './routes/survey/survey.page';

export const routes: Routes = [
  { path: "about", component: AboutPage },
  { path: "surname-forge", component: SurnameForgePage },
  { path: "survey", component: SurveyPage },
];
