import { Component, Input } from '@angular/core';
import { Animal } from '../../models/animal.interface';
import { Shelter } from '../../models/shelter.interface';

@Component({
  selector: 'app-shelter-card',
  templateUrl: './shelter-card.component.html',
  styleUrl: './shelter-card.component.scss'
})
export class ShelterCardComponent {
  @Input() shelter: Shelter | undefined;
}
