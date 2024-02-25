import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.scss']
})
export class AddEditBookComponent implements OnInit {
  form!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddEditBookComponent>,
    public dialog: MatDialog,
    private _matSnackBar: MatSnackBar,
    private adminService: AdminService,) { }

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(this.data && this.data.id ? this.data.id : ''),
      category: new FormControl(this.data && this.data.category ? this.data.category : '', Validators.required),
      code: new FormControl(this.data && this.data.code ? this.data.code : '', Validators.required),
      name: new FormControl(this.data && this.data.name ? this.data.name : '', Validators.required),
    });
  }

  close() {
    this.dialogRef.close();
  }

  async handleAddOrUpdate() {
    if (this.form.valid) {
      let obj;
      if (this.data) {
        obj = {
          name: this.form.value.name,
          code: this.form.value.code,
          category: this.form.value.category
        }
      }
      let data = null;
      data = this.data ? await this.adminService.updateBookData(this.data.id, obj) : await this.adminService.createBook(this.form.value.code, this.form.value.name, this.form.value.category);
      if (data || data === undefined) {
        this.showToastMessage(this.data ? "Book edited successfully" : "Book added successfully", 'success');
        this.dialogRef.close(data);
      } else {
        this.showToastMessage(this.data ? "Failed to edit book" : "Failed to add book", 'failed');
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
