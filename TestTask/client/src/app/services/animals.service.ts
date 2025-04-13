import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Animal } from '../models/animal.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {
  animalCache = new Map();
  baseUrl: string = environment.apiUrl;
  private readonly FAVORITES_KEY = 'favorite_animals';

  constructor(private http: HttpClient) { }

  addAnimal(model: any) {
    return this.http.post<Animal>(this.baseUrl + 'animals', model);
  }

  getAnimals(){
    return this.http.get<Animal[]>(this.baseUrl + 'animals');
  }

  deleteAnimal(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + `/animals/${id}`);
  }

  addFavorite(animal: Animal) {
    const favorites = this.getFavoritesFromStorage();
    // Check if animal already exists in favorites
    if (!favorites.some(fav => fav.id === animal.id)) {
      favorites.push(animal);
      console.log(favorites)
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
      return of(true); // Return observable with success status
    }
    return of(false); // Return observable with false if already exists
  }

  getFavAnimals(): Observable<Animal[]> {
    const favorites = this.getFavoritesFromStorage();
    return of(favorites);
  }

  removeFavorite(animalId: number): Observable<boolean> {
    const favorites = this.getFavoritesFromStorage();
    const initialLength = favorites.length;
    const updatedFavorites = favorites.filter(fav => fav.id !== animalId);
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return of(updatedFavorites.length < initialLength);
  }

  private getFavoritesFromStorage(): Animal[] {
    const favoritesJson = localStorage.getItem(this.FAVORITES_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
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
