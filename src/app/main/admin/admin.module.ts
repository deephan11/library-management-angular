import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ProfileComponent } from './profile/profile.component';
import { BooksComponent } from './books/books.component';
import { UsersComponent } from './users/users.component';
import { AdminService } from './admin.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddEditBookComponent } from './books/add-edit-book/add-edit-book.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { EditViewUserComponent } from './users/edit-view-user/edit-view-user.component';



@NgModule({
  declarations: [
    AdminComponent,
    ProfileComponent,
    BooksComponent,
    UsersComponent,
    AddEditBookComponent,
    EditViewUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [AdminService],
  exports: [ProfileComponent, BooksComponent],
})
export class AdminModule { }
