import { Favorite } from "./favorite";

export interface Volunteer {
  volunteerId: number;
  userId: string;
  name: string;
  phone?: string;
  interests?: string;
  location?: string;
  requests?: Request[];
  favorites?: Favorite[];
}
