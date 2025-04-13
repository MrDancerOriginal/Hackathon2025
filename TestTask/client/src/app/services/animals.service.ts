import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Animal } from '../models/animal.interface';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {
  animalCache = new Map();
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addAnimal(model: any) {
    return this.http.post<Animal>(this.baseUrl + 'animals', model);
  }

  getAnimals(){
    return this.http.get<Animal[]>(this.baseUrl + 'animals');
  }

  addLike(animalId, userId){
    return this.http.post<any>(
      `${this.baseUrl}/${userId}/likes`,
      animalId
    );
  }

  getAnimal(animalName: string) {
    const animal = [...this.animalCache.values()]
    .reduce((arr, elem) => arr.concat(elem.result), [])
    .find((animal: Animal) => animal.name === animalName);

    if (animal) return of(animal);

    return this.http.get<Animal>(this.baseUrl + 'animals/' + animalName);
  }
}
