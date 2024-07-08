import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './account/auth/auth.guard';
import { LoginComponent } from './account/auth/login/login.component';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then((m)=>m.AccountModule),
  },
  {
    path: 'pages',
    component: HomeComponent,
    loadChildren: () => import('./pages/pages.module').then((m)=>m.PagesModule),
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
