import { Animal } from "./animal.interface";

export interface Favorite {
  favoriteId: number;
  userId: string;
  announcementId: number;
  announcement?: Animal;
  addedDate: Date;
}
