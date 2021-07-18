import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {  FormBuilder, FormArray, FormControl, Validators, FormGroup } from '@angular/forms';

import { UsersService } from 'src/app/core/services/users.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @Input() editUserDetail: any;
  public userForm: FormGroup;


  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal,
    public usersService: UsersService) { 
    this.userForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.populateFormData();
  }

  populateFormData(): void {
    this.userForm.patchValue({
      id: this.editUserDetail.id,
      name: this.editUserDetail.name,
      email: this.editUserDetail.email,
      role: this.editUserDetail.role
    })
  }

  updateUserDetail() {
    let user = this.userForm.value;
    this.usersService.updateUserDetails(user, 'update');
    this.activeModal.close();  
  }
}
