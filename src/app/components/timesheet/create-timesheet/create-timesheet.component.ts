import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TimesheetService } from '../timesheet.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-timesheet',
  templateUrl: './create-timesheet.component.html',
  styleUrls: ['./create-timesheet.component.css']
})
export class CreateTimesheetComponent implements OnInit {
  items = [];
  currentUser = '';
  biggestNum = 0;
  timesheetData = {};

  constructor(private db: AngularFirestore, private timesheetService: TimesheetService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): any {
     this.timesheetService.getCollectionList().subscribe(result => {
       result.docs.forEach((doc) => {
         this.items.push(doc.data());
       });
     });

     const temper = this.db.collection('collectionList').get();
     temper.toPromise().then((querySnapshot) => {
       this.biggestNum = querySnapshot.size;
     });

     this.biggestNum += 1;
     const today = new Date();
     const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
     const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
     const dateTime = date + ' ' + time;

     this.timesheetData = {
       timesheetID: 'timesheet_' + this.biggestNum.toString(),
       userID: localStorage.getItem('userEmail'),
       dateCreated: dateTime,
       name: form.value.tname
     };

     if (this.checkTimeSheetExists(this.timesheetData)) {
       alert('A time sheet with this name already exists. Please open that timesheet, or create a new one.');
     } else {
       this.timesheetService.addTimesheetToFirestore(this.timesheetData);
       this.timesheetService.createRecordOnFirestore(this.timesheetData[`timesheetID`], {});
       localStorage.setItem('activeSheet', this.timesheetData[`timesheetID`]);
       this.router.navigate(['/home']).then();
     }
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
