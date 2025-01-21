import { Routes } from '@angular/router';
import { AboutPage } from './routes/about/about.page';
import { SurnameForgePage } from './routes/surnameForge/surnameForge.page';
import { SurveyPage } from './routes/survey/survey.page';
import { ImpressumPage } from './routes/impressum/impressum.page';
import { environment } from '../environments/environment';
import { Survey2Page } from './routes/survey2/survey2.page';

export const routes: Routes = environment.showOnlySurvey
  ? [ 
    { path: "survey2", component: Survey2Page },
    { path: "survey", component: SurveyPage },
  ]
  : [
    { path: "about", component: AboutPage },
    { path: "surname-forge", component: SurnameForgePage },
    { path: "survey2", component: Survey2Page },
    { path: "survey", component: SurveyPage },
  ];

routes.push(...[
  { path: "impressum", component: ImpressumPage },
  { path: "**",   redirectTo: "/survey2" },
]);
