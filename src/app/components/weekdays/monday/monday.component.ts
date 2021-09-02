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
import {AngularFirestore} from '@angular/fire/compat/firestore';

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

  constructor(private timesheetService: TimesheetService, private router: Router, private transferService: TransferService, private fs: AngularFirestore) { }

  async ngOnInit(): Promise<any> {
    this.timesheetService.getUserTimesheets().subscribe(result => {
      if (result.length <= 0) {
        this.transferService.setData('true');
      }
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

  async exportAsExcel(): Promise<any> {
    if (this.checkTable('timesheet')) {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, 'Timesheet.xlsx');
    }
  }

  async emailToAdmin(): Promise<any> {
    if (this.checkTable('email')) {
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
  }

  async editRecord(element): Promise<any> {
    this.transferService.setData(element);
    this.router.navigate(['edit-timesheet']).then();
  }

  async deleteRecord(element): Promise<any> {
    const answer = confirm('Are you sure you would like to delete this record?');
    if (answer) {
      this.fs.collection('finishedTimesheets').doc(element.id).delete().then();
    }
  }

  checkTable(method): any {
    const temp = this.transferService.getData();
    if (temp === 'true') {
      alert('Please create a {{ method }} before trying export.');
    } else {
      return true;
    }
  }
}
