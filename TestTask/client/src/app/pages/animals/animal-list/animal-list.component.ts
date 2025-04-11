import { Component } from '@angular/core';
import { Animal } from '../../../models/animal.interface';
import { AnimalsService } from '../../../services/animals.service';


@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrl: './animal-list.component.scss'
})
export class AnimalListComponent {
  animals: Animal[] = [];
  filteredAnimals: Animal[] = [];

  filter = {
    species: '',
    age: '',
    health: ''
  };


  constructor(private animalsService : AnimalsService) {

  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
      this.animalsService.getAnimals().subscribe({
        next: response => {
          if (response) {
            this.animals = response;
            this.filteredAnimals = response;
          }
        }
      });
  }

  applyFilter() {
    this.filteredAnimals = this.animals.filter(animal =>
      (!this.filter.species || animal.species?.toLowerCase().includes(this.filter.species.toLowerCase())) &&
      (!this.filter.age || animal.age?.toLowerCase().includes(this.filter.age.toLowerCase())) &&
      (!this.filter.health || animal.health?.toLowerCase().includes(this.filter.health.toLowerCase()))
    );
  }
}
