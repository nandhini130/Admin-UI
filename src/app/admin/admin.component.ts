import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UsersService } from '../core/services/users.service';
import { ErrorService } from '../core/services/error.service';
import { FilterPipe } from '../shared/pipes/filter.pipe';
import { DeleteUserComponent } from './delete-user/delete-user.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public userDetails: any = [];
  public searchInput: string = '';
  public errorMessage: any = '';
  public selectedUSers: any = [];


  constructor(private usersService: UsersService, 
    private errorService: ErrorService,
    private modal: NgbModal,
    private filterPipe: FilterPipe) { }

  ngOnInit(): void {
    this.usersService.getSelectedUSers().subscribe( users => {      
      this.selectedUSers = users;
    });
  
    this.fetchUserDetails();
  }

// fetch user details
  fetchUserDetails(): any {
    this.usersService.fetchUserDetails().subscribe( users => {
      this.userDetails = users;
      this.usersService.setUserDetails(this.userDetails);
    }, error => {
      console.log(error);
      let message = error.message || 'Something went wrong';
      this.errorService.setErrorMessage(message);
    });

  }

// delete user 
  deleteUsers() {
    if(this.selectedUSers.length > 0) {
      const modalRef = this.modal.open(DeleteUserComponent, { centered: true,  windowClass: 'modal-dialog-centered'  });
    } else {
      let message ='Select Users to delete';
      this.errorService.setErrorMessage(message);
    }
  }

// filter users
  filterUser() {
   let filteredValues = this.filterPipe.transform(this.userDetails, this.searchInput)
   this.usersService.setUserDetails(filteredValues);
  }

// reset filter and selected users
  resetFilter() {
    this.searchInput = '';
    this.filterUser();
    this.usersService.setSelectedUsers([]);
  }
}
