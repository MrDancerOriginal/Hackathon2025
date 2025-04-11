import { Component, OnInit } from '@angular/core';
import { Animal } from '../../../models/animal.interface';
import { ActivatedRoute } from '@angular/router';
import { AnimalsService } from '../../../services/animals.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-animal-page',
  templateUrl: './animal-page.component.html',
  styleUrl: './animal-page.component.scss'
})
export class AnimalPageComponent implements OnInit {

  animal: any = {} as any;

  constructor(
    private animalService: AnimalsService,
    private toastr: ToastrService,
    private route: ActivatedRoute,) {

    }

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => {
        this.animal = data['member']
      }
    });
  }

  addLike(animal : Animal){
    this.animalService.addLike(animal.id, 1).subscribe({
      next: () => this.toastr.success('Ви відгукнулись на ' + animal.name)
    });
  }
}
