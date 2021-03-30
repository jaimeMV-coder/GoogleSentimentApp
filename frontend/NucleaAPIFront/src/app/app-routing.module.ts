import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthModule} from './auth/auth.module';
import {CreateTextComponent} from './vistas/create-text/create-text.component';
import {ListTextComponent} from './vistas/list-text/list-text.component';
import {EditTextComponent} from './vistas/edit-text/edit-text.component';
import {DashboardComponent} from './vistas/dashboard/dashboard.component';

const routes: Routes = [
{path: '',  redirectTo:'/auth/login', pathMatch:'full'},
{path:'auth', loadChildren: './auth/auth.module#AuthModule'},
{path: 'createText',component:CreateTextComponent},
{path: 'myList',component:ListTextComponent},
{path: 'editText',component:EditTextComponent},
{path: 'dashboard',component:DashboardComponent},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  CreateTextComponent,
  ListTextComponent,
  EditTextComponent,
  DashboardComponent
]