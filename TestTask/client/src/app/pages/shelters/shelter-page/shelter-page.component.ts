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

    getCategoryName(categoryId: number): string {
      // Implement your category mapping logic here
      const categories = {
        1: 'Міський притулок',
        2: 'Приватний притулок',
        3: 'Державний притулок'
      };
      return categories[categoryId] || 'Інша категорія';
    }

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => {
        this.shelter = data['member']
        console.log(this.shelter)
      }
    });
  }
}
