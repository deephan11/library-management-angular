import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BorrowedComponent } from './borrowed/borrowed.component';
import { AdminModule } from '../admin/admin.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserService } from './user.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    UserComponent,
    BorrowedComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatToolbarModule,
    AdminModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule
  ],
  providers: [UserService]
})
export class UserModule { }
