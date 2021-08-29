import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Timesheet } from './timesheet.model';
import { TimesheetService } from './timesheet.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  constructor(private timesheetService: TimesheetService) { }

  ngOnInit(): void {
  }
}
