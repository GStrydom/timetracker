import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Timesheet } from '../../timesheet/timesheet.model';
import {TimesheetService} from '../../timesheet/timesheet.service';
import {Totals} from '../../timesheet/totals.models';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-tuesday',
  templateUrl: './tuesday.component.html',
  styleUrls: ['./tuesday.component.css']
})
export class TuesdayComponent implements OnInit {
  mainColumns = ['date', 'startTime', 'taskDescription', 'endTime', 'hoursWorked', 'edit', 'delete'];
  totalColumns = ['totalHours', 'amount'];
  mainDatasource: MatTableDataSource<Timesheet>;
  totalDatasource: MatTableDataSource<Totals>;
  daysTimesheet = [];
  totals = [];
  @ViewChild('TABLE') table: ElementRef;

  constructor(private timesheetService: TimesheetService) { }

  ngOnInit(): void {
    this.timesheetService.getTimeSheetRecords().subscribe(result => {
      for (let x = 0; x < result.length; x++) {
        if (result[x].day === 'Tuesday') {
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

  editRecord(element): any {
    console.log(element);
  }

  deleteRecord(element): any {
    console.log(element);
  }
}
