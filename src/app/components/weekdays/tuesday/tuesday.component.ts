import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Timesheet } from '../../timesheet/timesheet.model';
import {TimesheetService} from '../../timesheet/timesheet.service';

@Component({
  selector: 'app-tuesday',
  templateUrl: './tuesday.component.html',
  styleUrls: ['./tuesday.component.css']
})
export class TuesdayComponent implements OnInit {
  displayedColumns = ['date', 'startTime', 'taskDescription', 'endTime', 'hoursWorked'];
  datasource = new MatTableDataSource<Timesheet>();

  constructor(private timesheetService: TimesheetService) { }

  ngOnInit(): void {
    this.datasource.data = this.timesheetService.getTuesdayTimesheets();
    console.log('Fetching data...');
    console.log(this.datasource.data);
  }
}
