import { Component } from '@angular/core';
import { Animal } from '../../models/animal.interface';
import { AnimalsService } from '../../services/animals.service';

@Component({
  selector: 'app-fav-list',
  templateUrl: './fav-list.component.html',
  styleUrl: './fav-list.component.scss'
})
export class FavListComponent {
  favoriteAnimals: Animal[] = [];

  constructor(private animalsService: AnimalsService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites() {
    this.animalsService.getFavAnimals().subscribe(animals => {
      this.favoriteAnimals = animals;
    });
  }

  removeFavorite(animal: Animal) {
    this.animalsService.removeFavorite(animal.id).subscribe(success => {
      if (success) {
        this.loadFavorites(); // Refresh the list after removal
      }
    });
  }
}
