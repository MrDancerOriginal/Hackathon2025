import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authSheltersGuard } from './guards/auth-shelters.guard';

import { AnimalPageComponent } from './pages/animals/animal-page/animal-page.component';
import { animalDetailedResolver } from './resolvers/animal-detailed.resolver';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ServerErrorComponent } from './pages/errors/server-error/server-error.component';
import { AnimalListComponent } from './pages/animals/animal-list/animal-list.component';
import { AddAnimalComponent } from './pages/animals/add-animal/add-animal.component';
import { authVolunteerGuard } from './guards/auth-volunteer.guard';
import { AddShelterComponent } from './pages/shelters/add-shelter/add-shelter.component';
import { ShelterListComponent } from './pages/shelters/shelter-list/shelter-list.component';
import { ShelterPageComponent } from './pages/shelters/shelter-page/shelter-page.component';
import { shelterDetailedResolver } from './resolvers/shelter-detailed.resolver';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/profile/register/register.component';
import { LoginComponent } from './pages/profile/login/login.component';
import { ProfileComponent } from './pages/profile/profile/profile.component';
import { authGuard } from './guards/auth.guard';
import { PetStoreComponent } from './pages/pet-store/pet-store.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' }, // Додано перенаправлення для порожнього шляху
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'pet-store', component: PetStoreComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authSheltersGuard],
    children: [
      { path: 'add-animal', component: AddAnimalComponent },
      { path: 'animals', component: AnimalListComponent },
      { path: 'animals/:animal', component: AnimalPageComponent, resolve: { member: animalDetailedResolver } },
    ]
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authVolunteerGuard],
    children: [
      { path: 'add-shelter', component: AddShelterComponent },
      { path: 'shelters', component: ShelterListComponent },
      { path: 'shelters/:shelter', component: ShelterPageComponent, resolve: { member: shelterDetailedResolver } },
    ]
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
