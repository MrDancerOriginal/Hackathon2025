import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class MenuService {
  private isOpen = new BehaviorSubject<boolean>(false);
  
}
