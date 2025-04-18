import { ShelterCategory } from "../enums/shelter-category.interface";
import { Animal } from "./animal.interface";

export interface Shelter {
  shelterId: number;
  name: string;
  address: string;
  phone: string;
  category: string;
  announcements?: Animal[];
  photo?: string;
  userId: string;
  // requests?: Request[]; // Uncomment if Request model is available
}
