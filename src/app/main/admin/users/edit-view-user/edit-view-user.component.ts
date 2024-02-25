import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-edit-view-user',
  templateUrl: './edit-view-user.component.html',
  styleUrls: ['./edit-view-user.component.scss']
})
export class EditViewUserComponent implements OnInit {
  form!: FormGroup;
  bookData: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditViewUserComponent>,
    public dialog: MatDialog,
    private _matSnackBar: MatSnackBar,
    private adminService: AdminService,) { }

  async ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(this.data && this.data.id ? this.data.id : ''),
      limit: new FormControl(this.data && this.data.limit ? this.data.limit : '', Validators.required)
    });

    this.bookData = await this.adminService.getAvailableBooksBasedOnUser(this.data.id);
  }

  close() {
    this.dialogRef.close();
  }

  async handleUpdate() {
    if (this.form.valid) {
      let obj;
      obj = {
        limit: this.form.value.limit
      }
      let data = null;
      data = this.adminService.updateProfileData(this.data.id, obj);
      if (data) {
        this.showToastMessage("Limit updated successfully", 'success');
        this.dialogRef.close(data);
      } else {
        this.showToastMessage("Failed to update limit", 'failed');
      }
    }
  }

  showToastMessage(message: string, toastType: string) {
    this._matSnackBar.open(message, 'OK', {
      verticalPosition: 'top',
      duration: 2000,
      panelClass: [toastType],
    });
  }

}
