import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  hidePassword: boolean = true;
  isLogin: boolean = true;
  isRegister: boolean = false;

  constructor(private loginService: LoginService,
    private router: Router,
    private _matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      role: new FormControl(''),
    });
  }

  navigateToRegister() {
    this.isLogin = false;
    this.isRegister = true;
    this.form.reset();
    this.form.get('role')?.setValidators(Validators.required);
  }

  navigateToLogin() {
    this.isLogin = true;
    this.isRegister = false;
    this.form.reset();
    this.form.get('role')?.clearValidators();
  }

  async handleLogin() {
    if (this.form.valid) {
      const data = await this.loginService.getUser(this.form.value.email, this.form.value.password);
      if (data && data.length > 0) {
        this.showToastMessage("Logged in successful", 'success');
        let email = (data[0] as unknown as { email: string }).email;
        let role = (data[0] as unknown as { role: string }).role;
        window.localStorage.setItem('id', data[0].id);
        window.localStorage.setItem('email', email);
        window.localStorage.setItem('role', role);
        if (role === "admin") {
          this.router.navigate(['admin']);
        } else {
          this.router.navigate(['user']);
        }
      } else {
        this.showToastMessage("No user found", 'failed');
      }
    }
  }

  async handleRegister() {
    if (this.form.valid) {
      const data = await this.loginService.createUser(this.form.value.email, this.form.value.password, this.form.value.role);
      if(data){
        this.showToastMessage("Registration successful", 'success');
        window.localStorage.setItem('id', data);
        window.localStorage.setItem('email', this.form.value.email);
        window.localStorage.setItem('role', this.form.value.role);
        if (this.form.value.role === "admin") {
          this.router.navigate(['admin']);
        } else {
          this.router.navigate(['user']);
        }
      } else {
        this.showToastMessage("Something wrong", 'failed');
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
