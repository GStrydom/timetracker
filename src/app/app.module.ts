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
import { TimesheetItemComponent } from './components/timesheet/timesheet-item/timesheet-item.component';
import { ButtonbarComponent } from './components/buttonbar/buttonbar.component';
import { SidenavListComponent } from './components/shared/ui/sidenav-list/sidenav-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NewTimesheetComponent } from './components/timesheet/new-timesheet/new-timesheet.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

import { AuthService } from './components/auth/auth.service';
import { MatInputModule } from '@angular/material/input';

import { TimesheetService } from './components/timesheet/timesheet.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    TimesheetComponent,
    HomeComponent,
    AdminComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    TimesheetItemComponent,
    ButtonbarComponent,
    SidenavListComponent,
    NewTimesheetComponent
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
    AngularFirestoreModule
  ],
  providers: [AuthService, TimesheetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
