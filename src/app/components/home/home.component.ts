import { Component, OnInit } from '@angular/core';
import { TransferService } from '../shared/transfer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedTab = 0;

  constructor(private transferService: TransferService) { }

  ngOnInit(): void {
    switch (this.selectedTab) {
      case 0:
        this.transferService.setData('Monday');
    }
  }
}
