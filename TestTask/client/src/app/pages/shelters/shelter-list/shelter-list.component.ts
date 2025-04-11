import { Component } from '@angular/core';
import { ShelterService } from '../../../services/shelter.service';
import { Shelter } from '../../../models/shelter.interface';

@Component({
  selector: 'app-shelter-list',
  templateUrl: './shelter-list.component.html',
  styleUrl: './shelter-list.component.scss'
})
export class ShelterListComponent {
  shelters: Shelter[] = [];

  constructor(private sheltersService : ShelterService) {

  }

  ngOnInit(): void {
    this.loadShelters();
  }

  loadShelters() {
      this.sheltersService.getShelters().subscribe({
        next: response => {
          if (response) {
            this.shelters = response;
          }
        }
      });
  }
}
