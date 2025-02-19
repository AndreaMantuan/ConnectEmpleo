import { RouterModule, Routes } from "@angular/router";
import { CardsComponent } from "./components/cards/cards.component";
import { NgModule } from "@angular/core";


import { DetailsComponent } from "./components/cards/details/details.component";
import { RequirementsComponent } from "./components/cards/requirements/requirements.component";
import { SavedComponent } from "./components/saved/saved.component";
import { ChoiceComponent } from "./components/choice/choice.component";
import { MainViewComponent } from "./main-view.component";
import { UsersViewComponent } from "./usersProfile/users-view.component";

export const routes: Routes = [
  {
    path: '', component: MainViewComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'mainview' },

      {
        path: 'mainview',
        loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'recommendations' },
          {
            path: 'recommendations', component: CardsComponent,
            children: [
              { path: '', pathMatch: 'full', redirectTo: 'details' },
              { path: 'details', component: DetailsComponent },
              { path: 'requirements', component: RequirementsComponent },
            ]
          },
          { path: 'choice', component: ChoiceComponent, },
          { path: 'saved', component: SavedComponent, },
          {
            path: 'help',
            loadComponent: () => import('../../shared/pageShared/help-page/help-page.component').then(c => c.HelpPageComponent)
          },
        ],
      },
      {
        path: 'userProfile',
        component: UsersViewComponent,
        children: [
          {path: 'candidateProfile',
            loadComponent: () => import('./usersProfile/candidate/candidate-profile/candidate-profile.component').then(c=>c.CandidateProfileComponent)
          },

          {path: 'recruiterProfile',
            loadComponent: () => import('./usersProfile/recruiter/recruiter.component').then(c=>c.RecruiterComponent)
          },
        ]
      }


    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class viewRouting { }
