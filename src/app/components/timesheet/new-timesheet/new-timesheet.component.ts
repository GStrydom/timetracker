import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TimesheetService } from '../timesheet.service';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import {TransferService} from '../../shared/transfer.service';

@Component({
  selector: 'app-new-timesheet',
  templateUrl: './new-timesheet.component.html',
  styleUrls: ['./new-timesheet.component.css']
})
export class NewTimesheetComponent implements OnInit {
  timesheets: Observable<any>;
  formObj = {};
  selectedValue: string;

  constructor(private timesheetService: TimesheetService, private db: AngularFirestore, private transferService: TransferService) { }
    tasks: any[] = [
      { value: 'Connect Testing', viewValue: 'Connect Testing' },
      { value: 'Immerse Testing', viewValue: 'Immerse Testing' },
      { value: 'Break', viewValue: 'Break' },
    ];

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): any {
    this.formObj = {
      date: form.value.date,
      startTime: form.value.startTime,
      taskDescription: form.value.taskDescription,
      endTime: form.value.endTime,
      day: this.transferService.getData(),
      hoursWorked: form.value.hours
    };
    console.log(this.formObj);
    this.timesheetService.addTimesheetToFirestore(this.formObj);
  }
}
