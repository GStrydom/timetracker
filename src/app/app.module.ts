import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TimesheetComponent } from './components/timesheet/timesheet.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminComponent } from './components/admin/admin.component';
import { NavbarComponent } from './components/shared/ui/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';

import { AppRoutingModule } from './app-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ButtonbarComponent } from './components/shared/ui/buttonbar/buttonbar.component';
import { SidenavListComponent } from './components/shared/ui/sidenav-list/sidenav-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NewTimesheetComponent } from './components/timesheet/new-timesheet/new-timesheet.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import { AuthService } from './components/auth/auth.service';
import { MatInputModule } from '@angular/material/input';

import { TimesheetService } from './components/timesheet/timesheet.service';
import { TransferService } from './components/shared/transfer.service';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { environment } from '../environments/environment';
import { TimesheetActionsComponent } from './components/timesheet/timesheet-actions/timesheet-actions.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { UIService } from './components/shared/ui/ui.service';
import { MondayComponent } from './components/weekdays/monday/monday.component';
import { TuesdayComponent } from './components/weekdays/tuesday/tuesday.component';
import { WednesdayComponent } from './components/weekdays/wednesday/wednesday.component';
import { ThursdayComponent } from './components/weekdays/thursday/thursday.component';
import { FridayComponent } from './components/weekdays/friday/friday.component';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    TimesheetComponent,
    HomeComponent,
    AdminComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ButtonbarComponent,
    SidenavListComponent,
    NewTimesheetComponent,
    TimesheetActionsComponent,
    MondayComponent,
    TuesdayComponent,
    WednesdayComponent,
    ThursdayComponent,
    FridayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    RouterModule,
    AppRoutingModule,
    MatTableModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ],
  providers: [AuthService, TimesheetService, UIService, TransferService],
  bootstrap: [AppComponent]
})
export class AppModule { }
