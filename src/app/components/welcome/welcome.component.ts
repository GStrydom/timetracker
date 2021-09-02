import { Component, OnInit } from '@angular/core';
import { TimesheetService } from '../timesheet/timesheet.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  timesheetNames = [];
  activeTimesheet: string;
  timesheets = [];

  constructor(private timesheetService: TimesheetService) { }

  ngOnInit(): void {
    this.timesheetService.getCollectionList().subscribe(result => {
      for (let x = 0; x < result.length; x++) {
        this.timesheetNames.push(result[x].name);
      }
      console.log(this.timesheetNames);
    });
  }

  openTimeSheet(timeSheetName): any {
    this.timesheetService.getActiveTimesheet(timeSheetName).subscribe(result => {
      for (let x = 0; x < result.length; x++) {
        return '';
      }
    });
  }
}
