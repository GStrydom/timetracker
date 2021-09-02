import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TimesheetService } from '../timesheet.service';

@Component({
  selector: 'app-create-timesheet',
  templateUrl: './create-timesheet.component.html',
  styleUrls: ['./create-timesheet.component.css']
})
export class CreateTimesheetComponent implements OnInit {
  docList: Array<any> = [];
  numList1: Array<any> = [];
  numList2: Array<any> = [];
  currentUser: string;
  biggestNum: number;
  timesheetData: {};

  constructor(private db: AngularFirestore, private timesheetService: TimesheetService) { }

  ngOnInit(): void {
  }

  splitStr(str): any {
    return str.split('_')[1];
  }

  onSubmit(form: NgForm): any {
    this.timesheetService.getCollectionList().subscribe(result => {
      for (let x = 0; x < result.length; x++) {
        // @ts-ignore
        // tslint:disable-next-line:radix
        const temp = parseInt(this.splitStr(result[x].timesheetID));
        this.numList1.push(temp);
        // @ts-ignore
        if (result[x].userID === this.currentUser) {
          // @ts-ignore
          this.docList.push(result[x].timesheetID);
        }
      }
      for (const y of this.docList) {
        // tslint:disable-next-line:radix
        const temp = parseInt(this.splitStr(this.docList[y].timesheetID));
        this.numList2.push(temp);
      }
      const largest = 0;
      for (let i = 0; i <= this.numList1.length; i++){
        if (this.numList1[i] > largest) {
          this.biggestNum = this.numList1[i];
        }
      }
      this.biggestNum += 1;
      this.timesheetData = {
        timesheetID: 'timesheet_' + this.biggestNum.toString(),
        userID: localStorage.getItem('userEmail'),
        dateCreated: '01/09/21',
        name: form.value.startDate + ' - ' + form.value.endDate
      };
      if (this.checkTimeSheetExists(this.timesheetData)) {
        alert('A time sheet with this name already exists. Please open that timesheet, or create a new one.');
      } else {
        this.timesheetService.addTimesheetToFirestore(this.timesheetData);
      }
    });
  }

  checkTimeSheetExists(newSheet): any {
    this.timesheetService.getCollectionList().subscribe(result => {
      for (let x = 0; x < result.length; x++) {
        if (newSheet.name === result[x].name) {
          return true;
        }
      }
    });
  }
}
