import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditViewUserComponent } from './edit-view-user/edit-view-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['email', 'name', 'age', 'gender', 'limit', 'borrowed_limit', 'edit'];
  dataSource = new MatTableDataSource<any>();
  dialogRef: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private adminService: AdminService,
    private _matSnackBar: MatSnackBar,
    public dialog: MatDialog) { }

  async ngOnInit() {
    const data = await this.adminService.getUsers();
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

  handleEdit(data: any) {
    this.dialogRef = this.commonDialogOpen(data);
    this.dialogRef.afterClosed()
      .subscribe(async (response: any) => {
        const data = await this.adminService.getUsers();
        if (data && data.length > 0) {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
        }
      });
  }

  commonDialogOpen(data: any) {

    return this.dialog.open(EditViewUserComponent, {
      data: data,
      width: 'calc(100% - 68%)',
      height: 'calc(100vh - 45vh)',
      panelClass: 'add-book-popup',
      direction: 'ltr'
    });
  }

  showToastMessage(message: string, toastType: string) {
    this._matSnackBar.open(message, 'OK', {
      verticalPosition: 'top',
      duration: 2000,
      panelClass: [toastType],
    });
  }

}
