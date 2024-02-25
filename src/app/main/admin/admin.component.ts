import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  page: string = "books";

  constructor(private router: Router){}

  handlePage(event: string){
      this.page = event;
  }

  handleLogOut(){
    window.localStorage.clear();
    this.router.navigate(['login']);
  }

}
