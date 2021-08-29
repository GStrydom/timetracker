import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Timesheet } from '../../timesheet/timesheet.model';
import { TimesheetService } from '../../timesheet/timesheet.service';

@Component({
  selector: 'app-monday',
  templateUrl: './monday.component.html',
  styleUrls: ['./monday.component.css']
})
export class MondayComponent implements OnInit {
  displayedColumns = ['date', 'startTime', 'taskDescription', 'endTime', 'hoursWorked'];
  datasource: MatTableDataSource<Timesheet>;

  constructor(private timesheetService: TimesheetService) { }

  ngOnInit(): void {
    this.timesheetService.getMondayTimesheets().subscribe(result => {
      this.datasource = new MatTableDataSource(result);
    });
  }
}
