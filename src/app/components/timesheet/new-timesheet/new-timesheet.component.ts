import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TimesheetService } from '../timesheet.service';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-new-timesheet',
  templateUrl: './new-timesheet.component.html',
  styleUrls: ['./new-timesheet.component.css']
})
export class NewTimesheetComponent implements OnInit {
  timesheets: Observable<any>;
  formObj = {};

  constructor(private timesheetService: TimesheetService, private db: AngularFirestore) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.formObj = {
      date: form.value.date,
      startTime: form.value.startTime,
      taskDescription: form.value.taskDescription,
      endTime: form.value.endTime,
      day: 'Monday',
      hoursWorked: 8
    };
    console.log(this.formObj);
    this.timesheetService.addTimesheetToFirestore(this.formObj);
  }
}
