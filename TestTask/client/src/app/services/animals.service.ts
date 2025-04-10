import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Animal } from '../models/animal.interface';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {


  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addAnimal(model: any) {
    return this.http.post<Animal>(this.baseUrl + '', model);
  }

  getAnimals(){
    return this.http.get<Animal[]>(this.baseUrl + '');
  }
}
