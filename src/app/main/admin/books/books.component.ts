import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddEditBookComponent } from './add-edit-book/add-edit-book.component';
import { AdminService } from '../admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  role: any = window.localStorage.getItem('role');
  dialogRef: any;
  displayedColumns: string[] = this.role === "admin" ? ['code', 'name', 'category', 'status', 'borrower', 'edit'] : ['code', 'name', 'category', 'borrow'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog,
    private adminService: AdminService,
    private _matSnackBar: MatSnackBar,) { }

  async ngOnInit() {
    const data = this.role === "admin" ? await this.adminService.getBooks() : await this.adminService.getAvailableBooks();
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

  handleAddOrEdit(data: any) {
    this.dialogRef = this.commonDialogOpen(data);
    this.dialogRef.afterClosed()
      .subscribe(async (response: any) => {
        const data = await this.adminService.getBooks();
        if (data && data.length > 0) {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
        }
      });
  }

  commonDialogOpen(data: any) {

    return this.dialog.open(AddEditBookComponent, {
      data: data,
      width: 'calc(100% - 68%)',
      height: 'calc(100vh - 45vh)',
      panelClass: 'add-book-popup',
      direction: 'ltr'
    });
  }

  handleBorrowBook(event: any) {

    let alertPopup = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
    });

    alertPopup.componentInstance.confirmHead = "Return book";
    alertPopup.componentInstance.sufixConfirmMessage = "Would you like to borrow" + event.name + "?";
    alertPopup.afterClosed().subscribe(async alertPopupResponse => {
      if (alertPopupResponse) {
        const profileData = await this.adminService.getProfileData(window.localStorage.getItem('id'));
        if (profileData) {
          let limit = (profileData as unknown as { limit: number }).limit;
          let borrowed_limit = (profileData as unknown as { borrowed_limit: number }).borrowed_limit;
          if (borrowed_limit < limit) {
            let obj = {
              status: "borrowed",
              borrowed_user: window.localStorage.getItem('id'),
              borrower: window.localStorage.getItem('email'),
            }
            let data = null;
            data = await this.adminService.updateBookData(event.id, obj);
            await this.adminService.updateProfileData(window.localStorage.getItem('id'), { borrowed_limit: borrowed_limit + 1 });
            if (data === undefined) {
              const listData = await this.adminService.getAvailableBooks();
              if (listData && listData.length > 0) {
                this.dataSource = new MatTableDataSource(listData);
                this.dataSource.paginator = this.paginator;
              }
              this.showToastMessage("Book borrowed successfully", "success");
            }
          } else {
            this.showToastMessage("You have reached book borrowing limit", "failed");
          }
        }
      }
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

