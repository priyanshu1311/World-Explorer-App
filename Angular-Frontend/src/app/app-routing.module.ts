import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegGuardGuard } from './login-reg-guard.guard';
import { RegisterComponent } from './register/register.component';
import {LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import {DetailComponent} from './detail/detail.component';
import { SearchComponent } from './search/search.component';
import { RecommendedComponent } from './recommended/recommended.component'

const routes: Routes = [
  { path: 'register', component: RegisterComponent, canActivate:  [LoginRegGuardGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginRegGuardGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuardGuard] },
  { path: 'notfound', component: NotFoundComponent, canActivate:  [AuthGuardGuard] },
  { path: 'country-det/:countryName', component:CountryDetailsComponent, canActivate:  [AuthGuardGuard] },
  { path: 'detail' , component:DetailComponent},
  { path: 'recommended' , component:RecommendedComponent},
  { path: '', redirectTo: 'recommended', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
