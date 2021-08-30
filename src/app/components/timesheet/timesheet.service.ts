import { Timesheet } from './timesheet.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TransferService } from '../shared/transfer.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class TimesheetService {
  finishedTimesheets: Timesheet[];
  userID: any;

  constructor(private db: AngularFirestore, private transferService: TransferService, private auth: AngularFireAuth) {
  }

  addTimesheetToFirestore(timesheet: {}): any {
    this.db.collection('finishedTimesheets').add(timesheet).then();
  }

  getUserTimesheets(): any{
    const userEmail = localStorage.getItem('userEmail');
    return this.db.collection('finishedTimesheets', ref => ref.where('userID', '<=', userEmail))
      .valueChanges();
  }
}
