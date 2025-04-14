import { Component, OnInit } from '@angular/core';
import { Animal } from '../../../models/animal.interface';
import { ActivatedRoute } from '@angular/router';
import { AnimalsService } from '../../../services/animals.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

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
    private route: ActivatedRoute,
    private authService : AuthService
  ) {

    }

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => {
        this.animal = data['member']
        console.log(this.animal)
      }
    });
  }

  getImageUrl(imagePath: string): string {
    // Замінюємо зворотні слеші на прямі для URL
    const normalizedPath = imagePath.replace(/\\/g, '/');

    // Формуємо повний URL до зображення
    return `https://localhost:7077/${normalizedPath}`;
  }

  openImageModal(imageUrl: string) {
    // Тут можна реалізувати відкриття модального вікна з великим зображенням
    // Наприклад, використовуючи Angular Material Dialog або іншу бібліотеку
    console.log('Open image:', imageUrl);
    // Реалізація залежить від вашої бібліотеки модальних вікон
  }

  addLike(animal : Animal){
    this.animalService.addLike(animal.id, this.authService.getUserId()).subscribe({
      next: () => this.toastr.success('Ви відгукнулись на ' + animal.name)
    });
  }

  addFav(animal: Animal){
    this.animalService.addFavorite(animal);
  }

  handleImageError(event: any) {
    // Обробка помилок завантаження зображення
    event.target.src = 'assets/default-animal-image.jpg';
    event.target.onerror = null; // Запобігаємо нескінченному циклу помилок
  }
}
