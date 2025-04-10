import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Animal } from '../models/animal.interface';
import { AnimalsService } from '../services/animals.service';

export const animalDetailedResolver: ResolveFn<Animal> = (route, state) => {
  const animalService = inject(AnimalsService);

  return animalService.getAnimal(route.paramMap.get('animal')!)
};
