import { ShelterCategory } from "../enums/shelter-category.interface";

export interface UserRegistrationRequestDto {
  // Common fields
  role: string; // 'Shelter' or 'Volunteer'
  email: string;
  password: string;
  location: string;
  phone: string;

  // Additional fields for Shelter
  shelterName?: string;
  address?: string;
  category?: ShelterCategory;

  // Additional field for Volunteer
  fullName?: string;
}
