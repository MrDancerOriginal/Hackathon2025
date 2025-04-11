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
          }
        }
      });
  }
}
