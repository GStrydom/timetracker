import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Timesheet } from '../../timesheet/timesheet.model';
import { TimesheetService } from '../../timesheet/timesheet.service';
import { Totals } from '../../timesheet/totals.models';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-monday',
  templateUrl: './monday.component.html',
  styleUrls: ['./monday.component.css']
})
export class MondayComponent implements OnInit {
  mainColumns = ['date', 'startTime', 'taskDescription', 'endTime', 'hoursWorked'];
  totalColumns = ['totalHours', 'amount'];
  mainDatasource: MatTableDataSource<Timesheet>;
  totalDatasource: MatTableDataSource<Totals>;
  daysTimesheet = [];
  totals = [];
  @ViewChild('TABLE') table: ElementRef;

  constructor(private timesheetService: TimesheetService) { }

  ngOnInit(): void {
    this.totals.push({totalHours: 40, amount: 'R2,160.00'});

    this.timesheetService.getUserTimesheets().subscribe(result => {
      for (let x = 0; x < result.length; x++) {
        if (result[x].day === 'Monday') {
          this.daysTimesheet.push(result[x]);
        }
      }
      this.mainDatasource = new MatTableDataSource(this.daysTimesheet);
      this.totalDatasource = new MatTableDataSource(this.totals);
    });
  }

  exportAsExcel(): any {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'Timesheet.xlsx');
  }
}
