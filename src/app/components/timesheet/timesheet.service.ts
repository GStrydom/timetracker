import { Timesheet } from './timesheet.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TransferService } from '../shared/transfer.service';

@Injectable()
export class TimesheetService {
  finishedTimesheets: Timesheet[];
  userID: any;

  constructor(private db: AngularFirestore) {
  }

  addTimesheetToFirestore(timesheetData): any {
    this.db.collection('collectionList').add(timesheetData).then();
  }

  createRecordOnFirestore(timesheet, timesheetData): any {
    this.db.collection(timesheet).add(timesheetData).then();
  }

  getTimeSheetRecords(): any{
    const activeTimesheet = localStorage.getItem('activeTimesheet');
    return this.db.collection(activeTimesheet).valueChanges({idField: 'id'});
  }

  getCollectionList(): any {
    return this.db.collection('collectionList').get();
  }
}
