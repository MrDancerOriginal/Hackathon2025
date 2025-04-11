import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from '../../environment/environment';
import { Animal } from '../models/animal.interface';
import { Shelter } from '../models/shelter.interface';

@Injectable({
  providedIn: 'root'
})
export class ShelterService {
  shelterCache = new Map();
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addShelter(model: any) {
    return this.http.post<Shelter>(this.baseUrl + 'shelters', model);
  }

  getShelters(){
    return this.http.get<Shelter[]>(this.baseUrl + 'shelters');
  }

  getShelter(shelterName: string) {
    const shelter = [...this.shelterCache.values()]
    .reduce((arr, elem) => arr.concat(elem.result), [])
    .find((shelter: Shelter) => shelter.name === shelterName);

    if (shelter) return of(shelter);

    return this.http.get<Shelter>(this.baseUrl + 'shelters/' + shelterName);
  }
}
