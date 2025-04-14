import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Animal } from '../../models/animal.interface';
import { AnimalsService } from '../../services/animals.service';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrl: './animal-card.component.scss'
})
export class AnimalCardComponent implements OnInit {

  public url = 'https://localhost:7077/';

  ngOnInit(): void {
  }

  normalizePath(path: string): string {
    return path.replace(/\\/g, '/');
  }

  constructor(private animalService : AnimalsService) {


  }

  @Input() animal: any | undefined;

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

  handleImageError(event: any) {
    event.target.style.display = 'none'; // Hide broken image
    // Or you could set a flag to show the placeholder instead
  }
}
