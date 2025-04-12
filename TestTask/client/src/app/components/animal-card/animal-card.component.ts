import { Component, Input, OnInit } from '@angular/core';
import { Animal } from '../../models/animal.interface';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrl: './animal-card.component.scss'
})
export class AnimalCardComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.animal)
  }

  @Input() animal: Animal | undefined;




}
