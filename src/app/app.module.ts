import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TradeJournalComponent } from './trade-journal/trade-journal.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from 'src/environments/environment';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonSeriveService } from './core/common-serive.service';
import { GeneralService } from './core/genreal.service';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthService } from './core/auth.service';
// import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './register/register.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthGuardService } from './guards/auth-guard.service';
import { DropZoneDirective } from './drop-zone.directive';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { TradeEntriesComponent } from './trade-entries/trade-entries.component';
import { OwlModule } from 'ngx-owl-carousel';

import { HttpClientModule } from '@angular/common/http';
import { FilterByEntryId } from './models/filter';
import { PlansComponent } from './plans/plans.component';
import { FilterByEntryIdScreen } from './models/filterScreen';
import { FilterByPlanIdScreen } from './models/planFilterScreen';
import { FilterEntryPlanShow } from './models/filterEntryPlanShow';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

@NgModule({
  declarations: [
    AppComponent,
    TradeJournalComponent,
    LoginComponent,
    RegisterComponent,
    DropZoneDirective,
    TradeEntriesComponent,
    FilterByEntryId,
    PlansComponent,
    FilterByEntryIdScreen,
    FilterByPlanIdScreen,
    FilterEntryPlanShow,
    ForgotpasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    AppRoutingModule,
    NgbModalModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireStorageModule
    , OwlModule, HttpClientModule
  ],
  providers: [AuthGuardService, CommonSeriveService, GeneralService, DatePipe, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
