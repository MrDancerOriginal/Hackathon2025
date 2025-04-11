import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shelter-page',
  templateUrl: './shelter-page.component.html',
  styleUrl: './shelter-page.component.scss'
})
export class ShelterPageComponent {
  shelter: any = {} as any;

  constructor(
    private route: ActivatedRoute,) {

    }

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => {
        this.shelter = data['member']
      }
    });
  }
}
