import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../core/services/users.service';


@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  @Input() user: any;
  @Input() deleteMode: any;

  public selectedUSers: any = [];

  constructor(private usersService: UsersService,  public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.usersService.getSelectedUSers().subscribe( users => {      
      this.selectedUSers = users;
    });
  }

// delete selected users
  deleteUsers() {
    if(this.deleteMode === 'single') {
      const deleteUser = [];
      deleteUser.push(this.user);
      this.usersService.updateUserDetails(deleteUser, 'delete');
    } else {
      this.usersService.updateUserDetails(this.selectedUSers, 'delete');
    }

    this.activeModal.close();  
  }

}
