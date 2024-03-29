import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./main/login/login.module').then(m => m.LoginModule) },
  { path: 'admin', loadChildren: () => import('./main/admin/admin.module').then(m => m.AdminModule) },
  { path: 'user', loadChildren: () => import('./main/user/user.module').then(m => m.UserModule) },
  { path: 'confirm-dialog', loadChildren: () => import('./main/confirm-dialog/confirm-dialog.module').then(m => m.ConfirmDialogModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
