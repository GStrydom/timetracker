import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { Timesheet } from '../../timesheet/timesheet.model';
import { TimesheetService } from '../../timesheet/timesheet.service';
import { Totals } from '../../timesheet/totals.models';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { TransferService } from '../../shared/transfer.service';

import '../../../../assets/smtp.js';
declare let Email: any;

@Component({
  selector: 'app-monday',
  templateUrl: './monday.component.html',
  styleUrls: ['./monday.component.css']
})
export class MondayComponent implements OnInit {
  mainColumns = ['date', 'startTime', 'taskDescription', 'endTime', 'hoursWorked', 'edit', 'delete'];
  totalColumns = ['totalHours', 'amount'];
  mainDatasource: MatTableDataSource<Timesheet>;
  totalDatasource: MatTableDataSource<Totals>;
  daysTimesheet = [];
  totals = [];
  hours = 0;
  rate = 95.00;
  amount: any = 0;

  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private timesheetService: TimesheetService, private router: Router, private transferService: TransferService) { }

  ngOnInit(): void {
    this.timesheetService.getUserTimesheets().subscribe(result => {
      for (let x = 0; x < result.length; x++) {
        if (result[x].day === 'Monday') {
          // tslint:disable-next-line:radix
          this.hours += parseInt(result[x].hoursWorked);
          if (result[x].taskDescription === 'Break') {
            this.hours -= 1;
          }
          this.daysTimesheet.push(result[x]);
        }
      }
      this.amount = this.hours * this.rate;
      this.amount = 'R ' + this.amount.toString() + '.00';
      this.totals.push({totalHours: this.hours, amount: this.amount});
      this.mainDatasource = new MatTableDataSource(this.daysTimesheet);
      this.totalDatasource = new MatTableDataSource(this.totals);

      this.sort.sort(({ id: 'startTime', start: 'asc'}) as MatSortable);
      this.mainDatasource.sort = this.sort;
    });
  }

  exportAsExcel(): any {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'Timesheet.xlsx');
  }

  emailToAdmin(): any {
    Email.send({
      Host: 'smtp.elasticemail.com',
      Username: 'gregstrydom5@gmail.com',
      Password: 'BFF36BE0713DCAF828E4C2CD48F77B968528',
      To : 'gregory.strydom079@gmail.com',
      From : 'gregstrydom5@gmail.com',
      Subject : 'This is the subject',
      Body : 'And this is the body',
      Attachments : [
        {

        }]
    }).then(
      message => alert(message)
    );
  }

  editRecord(element): any {
    this.transferService.setData(element);
    this.router.navigate(['edit-timesheet']).then();
  }

  deleteRecord(element): any {
    console.log(element);
  }
}
