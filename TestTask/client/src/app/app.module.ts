import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './components/text-input/text-input.component';
import { FileUploadModule } from 'ng2-file-upload';
import { AnimalCardComponent } from './components/animal-card/animal-card.component';
import { SharedModule } from './shared/shared.module';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimalPageComponent } from './pages/animals/animal-page/animal-page.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ServerErrorComponent } from './pages/errors/server-error/server-error.component';
import { RegisterComponent } from './pages/profile/register/register.component';
import { AuthComponent } from './pages/profile/auth/auth.component';
import { AnimalListComponent } from './pages/animals/animal-list/animal-list.component';
import { AddAnimalComponent } from './pages/animals/add-animal/add-animal.component';
import { ShelterListComponent } from './pages/shelters/shelter-list/shelter-list.component';
import { ShelterPageComponent } from './pages/shelters/shelter-page/shelter-page.component';
import { AddShelterComponent } from './pages/shelters/add-shelter/add-shelter.component';

@NgModule({
  declarations: [
    AppComponent,
    AddAnimalComponent,
    AnimalListComponent,
    TextInputComponent,
    AnimalCardComponent,
    AnimalPageComponent,
    NotFoundComponent,
    ServerErrorComponent,
    RegisterComponent,
    AuthComponent,
    ShelterListComponent,
    ShelterPageComponent,
    AddShelterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
