import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmDialogComponent } from './confirm-dialog.component';

const routes: Routes = [{ path: '', component: ConfirmDialogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmDialogRoutingModule { }
