import { Injectable } from '@angular/core';
import { Debt } from './debt.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddDebtService {
  data: Debt[] = [];
  data2: Debt[] = [];

  dataChanged = new Subject<Debt[]>();
  dataChanged$ = this.dataChanged.asObservable();

  data2Changed = new Subject<Debt[]>();
  data2Changed$ = this.data2Changed.asObservable();

  getDebts() {
    return this.data.slice();
  }

  getDebts2() {
    return this.data2.slice();
  }

  addNewDebt(date: string, sum: number) {
    const newDebt = {
      date: date,
      sum: sum,
    };
    this.data.push(newDebt);
    this.dataChanged.next([...this.data]);

    console.log(this.data, newDebt);
  }

  addNewDebt2(date: string, sum: number) {
    const newDebt = {
      date: date,
      sum: sum,
    };
    this.data2.push(newDebt);
    this.data2Changed.next(this.data2.slice());

    console.log(this.data2, newDebt);
  }
}
