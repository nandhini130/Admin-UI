import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


import { AdminComponent } from './admin.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { AdminRoutingModule } from './admin-routing.module';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AlertComponent } from '../core/components/alert/alert.component';


@NgModule({
  declarations: [
    AdminComponent,
    UserDetailsComponent,
    DeleteUserComponent,
    EditUserComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAlertModule,
    NgbPaginationModule,
    AdminRoutingModule,
    NgxPaginationModule
  ]
})
export class AdminModule {}
