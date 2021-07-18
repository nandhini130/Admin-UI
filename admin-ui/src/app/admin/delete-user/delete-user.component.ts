import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../core/services/users.service';


@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  public selectedUSers: any = [];

  constructor(private usersService: UsersService,  public activeModal: NgbActiveModal) { }

  ngOnInit(): void {

    this.usersService.getSelectedUSers().subscribe( users => {
      console.log('entered get');
      
      this.selectedUSers = users;
    });
  }

  deleteUsers() {
      console.log('entered delete');
    
      this.usersService.updateUserDetails(this.selectedUSers, 'delete');
      this.activeModal.close();  
  }

}
