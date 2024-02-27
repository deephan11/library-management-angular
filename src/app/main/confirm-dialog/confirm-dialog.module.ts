import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmDialogRoutingModule } from './confirm-dialog-routing.module';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    ConfirmDialogRoutingModule,
    MatDialogModule,
    MatButtonModule,
  ]
})
export class ConfirmDialogModule { }
