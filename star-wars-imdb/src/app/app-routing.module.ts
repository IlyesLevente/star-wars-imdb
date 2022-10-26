import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoggedInGuard } from './core/guards/logged-in.guard';
import { PersonResolver } from './core/resolver/person.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canActivate: [LoggedInGuard],
  },
  {
    path: 'person',
    loadChildren: () =>
      import('./person/person.module').then(m => m.PersonModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: { person: PersonResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
