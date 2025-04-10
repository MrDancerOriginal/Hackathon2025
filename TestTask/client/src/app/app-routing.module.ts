import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authSheltersGuard } from './guards/auth-shelters.guard';
import { AddAnimalComponent } from './pages/add-animal/add-animal.component';
import { AnimalListComponent } from './pages/animal-list/animal-list.component';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authSheltersGuard],
    children: [
      { path: 'add-animal', component: AddAnimalComponent },
      { path: 'animals', component: AnimalListComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
