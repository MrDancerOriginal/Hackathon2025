import { Component, Input } from '@angular/core';
import { Animal } from '../../models/animal.interface';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrl: './animal-card.component.scss'
})
export class AnimalCardComponent {

  @Input() animal: Animal | undefined;


}
