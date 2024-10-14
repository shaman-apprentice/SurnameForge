import { Routes } from '@angular/router';
import { AboutPage } from './routes/about/about.page';
import { SurnameForgePage } from './routes/surnameForge/surnameForge.page';
import { SurveyPage } from './routes/survey/survey.page';
import { ImpressumPage } from './routes/impressum/impressum.page';
import { environment } from '../environments/environment';

export const routes: Routes = environment.showOnlySurvey
  ? [ { path: "survey", component: SurveyPage } ]
  : [
    { path: "about", component: AboutPage },
    { path: "surname-forge", component: SurnameForgePage },
    { path: "survey", component: SurveyPage },
  ];

routes.push(...[
  { path: "impressum", component: ImpressumPage },
  { path: "**",   redirectTo: "/survey" },
]);
