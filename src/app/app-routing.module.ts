import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/*========= All Component ===========*/

import { TradeJournalComponent } from './trade-journal/trade-journal.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { TradeEntriesComponent } from './trade-entries/trade-entries.component';
import { PlansComponent } from './plans/plans.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'tradeJournal', component: TradeJournalComponent, canActivate: [AuthGuardService] },
  { path: 'tradeEntries', component: TradeEntriesComponent, canActivate: [AuthGuardService] },
  { path: 'tradePlans', component: PlansComponent, canActivate: [AuthGuardService] },
  // { path: '**', redirectTo: 'login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
