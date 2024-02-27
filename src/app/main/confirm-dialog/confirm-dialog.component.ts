import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  public confirmHead!: string;
  public sufixConfirmMessage!: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>){}

  handleEvent(event: boolean){
    this.dialogRef.close(event);
  }

}
