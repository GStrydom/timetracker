import { Injectable } from '@angular/core';

@Injectable()
export class TransferService {

  constructor() {}

  private data;

  setData(data): any{
    this.data = data;
  }

  getData(): any{
    const temp = this.data;
    this.clearData();
    return temp;
  }

  clearData(): any{
    this.data = undefined;
  }
}
