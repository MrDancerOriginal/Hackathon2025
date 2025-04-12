import { ResolveFn } from '@angular/router';
import { ShelterService } from '../services/shelter.service';
import { inject } from '@angular/core';

export const shelterDetailedResolver: ResolveFn<boolean> = (route, state) => {
  const shelterService = inject(ShelterService);

  return shelterService.getShelter(route.paramMap.get('shelter')!)
};
