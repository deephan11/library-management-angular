import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-borrowed',
  templateUrl: './borrowed.component.html',
  styleUrls: ['./borrowed.component.scss']
})
export class BorrowedComponent implements OnInit {
  displayedColumns: string[] = ['code', 'name', 'category', 'return'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService,
    public dialog: MatDialog,
    private _matSnackBar: MatSnackBar,) { }

  async ngOnInit() {
    const data = await this.userService.getBorrowedBooks();
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

  async handleReturnBook(event: any) {
    let alertPopup = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
    });

    alertPopup.componentInstance.confirmHead = "Borrow book";
    alertPopup.componentInstance.sufixConfirmMessage = "Would you like to borrow " + event.name + "?";
    alertPopup.afterClosed().subscribe(async alertPopupResponse => {
      if (alertPopupResponse) {
        const profileData = await this.userService.getProfileData(window.localStorage.getItem('id'));
        if (profileData) {
          let borrowed_limit = (profileData as unknown as { borrowed_limit: number }).borrowed_limit;
          let obj = {
            status: "available",
            borrowed_user: "",
            borrower: ""
          }
          let data = null;
          data = await this.userService.updateBookData(event.id, obj);
          await this.userService.updateProfileData(window.localStorage.getItem('id'), { borrowed_limit: borrowed_limit - 1 });
          if (data === undefined) {
            const listData = await this.userService.getBorrowedBooks();
            if (listData) {
              this.dataSource = new MatTableDataSource(listData);
              this.dataSource.paginator = this.paginator;
            }
            this.showToastMessage("Book returned successfully", "success");
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
