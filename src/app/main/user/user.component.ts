import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
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
