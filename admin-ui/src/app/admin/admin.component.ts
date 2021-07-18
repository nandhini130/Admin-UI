import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UsersService } from '../core/services/users.service';
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

  constructor(private usersService: UsersService, private modal: NgbModal,
    private filterPipe: FilterPipe) { }

  ngOnInit(): void {
    this.fetchUserDetails();
  }

  fetchUserDetails(): any {
    this.usersService.fetchUserDetails().subscribe( users => {
      this.userDetails = users;
      this.usersService.setUserDetails(this.userDetails);
    }, error => {
      console.log(error);
      
    });

  }

  deleteUsers() {
    const modalRef = this.modal.open(DeleteUserComponent);
  }

  filterUser() {
   let filteredValues = this.filterPipe.transform(this.userDetails, this.searchInput)
   this.usersService.setUserDetails(filteredValues);
  }

  resetFilter() {
    this.searchInput = '';
    this.filterUser();
    this.usersService.setSelectedUsers([]);
  }
}
