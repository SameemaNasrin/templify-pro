import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  templateNav = new BehaviorSubject<string>('explore');

  public templateNavState$: Observable<string> =
    this.templateNav.asObservable();
  constructor() {}

  updateTemplateNav(nextNav: string): void {
    this.templateNav.next(nextNav);
  }
}
