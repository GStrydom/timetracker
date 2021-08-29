import { Timesheet } from './timesheet.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable()
export class TimesheetService {
  finishedTimesheets: Timesheet[];

  constructor(private db: AngularFirestore) {
  }

  addTimesheetToFirestore(timesheet: {}): any {
    this.db.collection('finishedTimesheets').add(timesheet).then();
  }

  getMondayTimesheets(): any{
    return this.db.collection('finishedTimesheets', ref => ref.where('day', '>=', 'Monday')
      .where('day', '<=', 'Monday' + '\uf8ff'))
      .valueChanges();
  }

  getTuesdayTimesheets(): any{
    return this.db.collection('finishedTimesheets', ref => ref.where('day', '>=', 'tuesday')
      .where('day', '<=', 'tuesday' + '\uf8ff'))
      .snapshotChanges();
  }
}
