import { inject, Injectable } from '@angular/core';
import { Debt, DebtRes } from './debt.model';
import { Subject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AddDebtService {
  apiService = inject(ApiService);

  data: Debt[] = [];
  data2: Debt[] = [];

  dataChanged = new Subject<Debt[]>();
  dataChanged$ = this.dataChanged.asObservable();

  data2Changed = new Subject<Debt[]>();
  data2Changed$ = this.data2Changed.asObservable();

  getDebts() {
    this.apiService.getDebts().subscribe((debts) => {
      const data = debts as DebtRes[];
      data.forEach((debt) => {
        if (debt.user === 1) {
          delete debt.id;
          delete debt.user;
          this.data.push(debt);
          this.dataChanged.next([...this.data]);
        }
        if (debt.user === 2) {
          delete debt.id;
          delete debt.user;
          this.data2.push(debt);
          this.data2Changed.next([...this.data2]);
        }
      });
    });
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
    this.apiService
      .postDebts(date, sum, 1)
      .subscribe((response) => console.log('Response from API: ', response));

    console.log(this.data, newDebt);
  }

  addNewDebt2(date: string, sum: number) {
    const newDebt = {
      date: date,
      sum: sum,
    };
    this.data2.push(newDebt);
    this.data2Changed.next(this.data2.slice());
    this.apiService
      .postDebts(date, sum, 2)
      .subscribe((response) => console.log('Response from API: ', response));

    console.log(this.data2, newDebt);
  }
}
