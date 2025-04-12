import { Component, Input } from '@angular/core';
import { Animal } from '../../../models/animal.interface';
import { AnimalsService } from '../../../services/animals.service';


@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrl: './animal-list.component.scss'
})
export class AnimalListComponent {
  @Input() inputAnimals : Animal[] = [];
  animals: Animal[] = [];
  filteredAnimals: Animal[] = [];

  filter = {
    name: '',
    species: '',
    minAge: '',
    maxAge: '',
    health: ''
  };


  constructor(private animalsService : AnimalsService) {

  }

  ngOnInit(): void {

    if(this.inputAnimals.length === 0){
      this.loadMembers();
    }else{

      this.animals = this.inputAnimals;
      this.filteredAnimals = this.inputAnimals;
    }

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
      (!this.filter.health || animal.health?.toLowerCase().includes(this.filter.health.toLowerCase())) &&
      (!this.filter.name || animal.name?.toLowerCase().includes(this.filter.name.toLowerCase())) &&
      (!this.filter.minAge || animal.age >= +this.filter.minAge) &&
      (!this.filter.maxAge || animal.age <= +this.filter.maxAge)
    );
  }
}
