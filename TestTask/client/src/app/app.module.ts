import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddAnimalComponent } from './pages/add-animal/add-animal.component';
import { AnimalListComponent } from './pages/animal-list/animal-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './components/text-input/text-input.component';
import { FileUploadModule } from 'ng2-file-upload';
import { AnimalCardComponent } from './components/animal-card/animal-card.component';
import { SharedModule } from './shared/shared.module';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimalPageComponent } from './pages/animal-page/animal-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AddAnimalComponent,
    AnimalListComponent,
    TextInputComponent,
    AnimalCardComponent,
    AnimalPageComponent
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
