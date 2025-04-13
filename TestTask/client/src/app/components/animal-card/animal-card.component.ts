import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Animal } from '../../models/animal.interface';
import { AnimalsService } from '../../services/animals.service';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrl: './animal-card.component.scss'
})
export class AnimalCardComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.animal)
  }


  constructor(private animalService : AnimalsService) {


  }

  @Input() animal: Animal | undefined;

  @Input() isAuthor = false;

  onDelete() {
    this.animalService.deleteAnimal(this.animal.id).subscribe({
      next: () => {
        // Remove the deleted animal from the lists
        location.reload();
      },
      error: (err) => {
        console.error('Error deleting animal:', err);
      }})
  }


}
