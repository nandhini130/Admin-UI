import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model'
import { UsersService } from '../../core/services/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public userDetails: any;
  public columns: any = []; // user table columns
  public selectedUsers: User[] = [];
  public deleteCount = 1;
  public isAllSelected: boolean = false;

  // pagination
  public page = 1;
  public pageSize =10;
  public indexRange: number = 0;
  public startIndex: number = 0;

  constructor(private usersService: UsersService, private modal: NgbModal) {}

  ngOnInit(): void {
    this.usersService.getUserDetails().subscribe( data => {
      this.userDetails = data;
    });
    
    this.columns = [ 
      {header: 'Select Option'},
      {header: 'Name'},
      {header: 'Email'},
      {header: 'Role'},
      {header: 'Actions'}
    ];
  }


  // on  click pof select All

  onSelectAll(event: any) {
    if(event.target.checked) {
      this.addAllUser();
    } else {
      this.removeAllUser();
    }
  }

   // adds all users to the selected List
   addAllUser() {
   
    let users = JSON.parse(JSON.stringify(this.userDetails)); 
     this.indexRange = this.page * this.pageSize;
    this.startIndex = this.indexRange - this.pageSize;
        console.log('start ',this.startIndex, 'end: ', this.indexRange);
        
    const filterData = users.filter((element: any, index: number) => index >= this.startIndex && index < this.indexRange);
    this.selectedUsers  = filterData;
    this.usersService.setSelectedUsers(this.selectedUsers);
  }

  // removes all users from the selected list
  removeAllUser() {
    this.selectedUsers = [];  
    this.usersService.setSelectedUsers(this.selectedUsers);
  }

  // on row click
  onRowSelect(event: any, selectedRow: User, rowIndex: number) {
    if(event.target.checked) {
      this.addUser(selectedRow);
      
    } else {
      this.removeUser(rowIndex);
    }
  }

  // adds user to the selected List
  addUser(selectedUser: User) {
    this.selectedUsers.push(selectedUser);
    this.usersService.setSelectedUsers(this.selectedUsers);    
  }

  // removes user from the selected list
  removeUser(rowindex: number) {
    this.selectedUsers.splice(rowindex, this.deleteCount);
    this.usersService.setSelectedUsers(this.selectedUsers);
  }

  isUserChecked(userData: User) {    
    return this.selectedUsers.some((user: User) => user.id === userData.id)
  }

  deleteUser(rowData: User) {
    const modalRef = this.modal.open(DeleteUserComponent);
  }

  editUser(rowData: User) {
    const modalRef = this.modal.open(EditUserComponent, { size: 'lg'});
    modalRef.componentInstance.editUserDetail = rowData;

  }

  // pagination
  pageChange(event: any) {
    let selectedPage = this.indexRange / this.pageSize;
    if (event == selectedPage) {
      this.isAllSelected = true;   
    } else {
      this.isAllSelected = false;
    }
  }

}
