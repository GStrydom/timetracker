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

  addTimesheetToFirestore(timesheetData): any {
    this.db.collection('collectionList').add(timesheetData).then();
  }

  getUserTimesheets(): any{
    const userEmail = localStorage.getItem('userEmail');
    return this.db.collection('finishedTimesheets', ref => ref.where('userID', '<=', userEmail))
      .valueChanges({idField: 'id'});
  }

  getCollectionList(): any {
    return this.db.collection('collectionList').valueChanges();
  }

  getActiveTimesheet(timesheetName): any {
    return this.db.collection(timesheetName).valueChanges();
  }
}
