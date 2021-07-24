import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../../shared/models/user.model'

import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.serverUrl;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private selectedUsers = new BehaviorSubject<User[]>([]);
  private users = new BehaviorSubject<User[]>([]);

  public userDetails: User[] = [];

  constructor(private httpClient: HttpClient) { }

  fetchUserDetails():Observable<User> {
    return this.httpClient.get<User>(`${BACKEND_URL}/members.json`)
    .pipe(
      catchError(this.handleError)
    );
  }
  
  handleError(error: any) {
    return throwError(error.message || 'Something went wrong')
  }  

  // selected user section

  setSelectedUsers(users: User[]) {
    this.selectedUsers.next(users)
  }

  getSelectedUSers(): Observable<User[]> {
    return this.selectedUsers.asObservable();
  }

  // user section

  setUserDetails(data: User[]) {
    this.userDetails = data;
    this.users.next(this.userDetails);
  }


  updateUserDetails(users: any, action: string) {
    if(action === 'update') {
      if(users) {
        // this.userDetails.forEach((data: User) => {
        //    if(data.id == users.id) {
        //       data = users
        //    }
        // });
        const userIndex =  this.userDetails.findIndex( user => user.id === users.id);
        console.log( this.userDetails[userIndex]);
        

        this.userDetails[userIndex] = users;
        this.userDetails = [...new Set(this.userDetails)];
        console.log('after');
        
        console.log( this.userDetails[userIndex]);

      }

    }

    if(action === 'delete') {
      if(users.length > 0) {

        users.forEach((data: any) => {
          const startIndex =  this.userDetails.findIndex( user => user.id === data.id);
          const deleteCount = 1;
          this.userDetails.splice(startIndex, deleteCount)
        })
      }

    }

    this.users.next(this.userDetails)
  }

  getUserDetails(): Observable<User[]> {
    return this.users.asObservable();
  }
}
