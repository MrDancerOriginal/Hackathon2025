import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authSheltersGuard } from './guards/auth-shelters.guard';
import { AddAnimalComponent } from './pages/add-animal/add-animal.component';
import { AnimalListComponent } from './pages/animal-list/animal-list.component';
import { AnimalPageComponent } from './pages/animal-page/animal-page.component';
import { animalDetailedResolver } from './resolvers/animal-detailed.resolver';
const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authSheltersGuard],
    children: [
      { path: 'add-animal', component: AddAnimalComponent },
      { path: 'animals', component: AnimalListComponent},
      { path: 'animals/:animal', component: AnimalPageComponent, resolve: { member: animalDetailedResolver } },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
