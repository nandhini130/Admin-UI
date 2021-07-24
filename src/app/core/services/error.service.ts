import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private errorMessage = new BehaviorSubject<string>('');

  constructor() { }

  setErrorMessage(message: string) {
    this.errorMessage.next(message)
  }

  getErrorMessage(): Observable<string> {
    return this.errorMessage.asObservable();
  }
}
