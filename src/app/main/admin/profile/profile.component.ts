import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from '../admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form!: FormGroup;
  role: any = window.localStorage.getItem('role');

  constructor(private adminService: AdminService,
    private _matSnackBar: MatSnackBar) { }
  async ngOnInit() {
    this.form = new FormGroup({
      age: new FormControl(''),
      gender: new FormControl(''),
      name: new FormControl(''),
      limit: new FormControl(''),
      borrowed_limit: new FormControl('')
    });
    const data = await this.adminService.getProfileData(window.localStorage.getItem('id'));
    if (data) {
      let age = (data as unknown as { age: string }).age;
      let name = (data as unknown as { name: string }).name;
      let gender = (data as unknown as { gender: string }).gender;
      let limit = 0, borrowed_limit = 0;
      if (this.role === 'user') {
        limit = (data as unknown as { limit: number }).limit;
        borrowed_limit = (data as unknown as { borrowed_limit: number }).borrowed_limit;
      }
      this.form.setValue({
        age: age,
        gender: gender,
        name: name,
        limit: limit,
        borrowed_limit: limit - borrowed_limit
      });
    }
  }

  async handleUpdate() {
    let obj = {
      age: this.form.value.age,
      gender: this.form.value.gender,
      name: this.form.value.name
    }
    let data = null;
    data = await this.adminService.updateProfileData(window.localStorage.getItem('id'), obj);
    if (data === undefined) {
      this.showToastMessage('Profile update successfully', 'success');
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
