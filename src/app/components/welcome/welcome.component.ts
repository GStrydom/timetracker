import { Component, OnInit } from '@angular/core';
import { TimesheetService } from '../timesheet/timesheet.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  timesheetNames = [];

  constructor(private timesheetService: TimesheetService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): any {
    this.timesheetService.getCollectionList().subscribe(result => {
      result.docs.forEach((doc) => {
        this.timesheetNames.push(doc.data());
      });
    });
  }

  openTimeSheet(timeSheetName): any {
    console.log('result');
  }

  deleteTimeSheet(timesheetName): any {
    console.log('Deleted');
  }
}
