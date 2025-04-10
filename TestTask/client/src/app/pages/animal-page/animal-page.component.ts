import { Component, OnInit } from '@angular/core';
import { Animal } from '../../models/animal.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-animal-page',
  templateUrl: './animal-page.component.html',
  styleUrl: './animal-page.component.scss'
})
export class AnimalPageComponent implements OnInit {

  animal: Animal = {} as Animal;

  constructor(
    private route: ActivatedRoute,) {

    }

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => this.animal = data['animal']
    });
  }
}
