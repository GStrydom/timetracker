import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TimesheetService } from '../timesheet.service';

@Component({
  selector: 'app-new-timesheet',
  templateUrl: './new-timesheet.component.html',
  styleUrls: ['./new-timesheet.component.css']
})
export class NewTimesheetComponent implements OnInit {

  constructor(private timesheetService: TimesheetService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    console.log(form);
  }
}
