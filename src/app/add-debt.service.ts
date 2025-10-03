import { inject, Injectable } from '@angular/core';
import { Debt, DebtRes } from './debt.model';
import { concatMap, finalize, from, Subject } from 'rxjs';
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

  total = 0;
  total2 = 0;

  totalChanged = new Subject();
  totalChanged$ = this.totalChanged.asObservable();

  total2Changed = new Subject();
  total2Changed$ = this.total2Changed.asObservable();

  name1!: string;
  name2!: string;

  ids1: number[] = [];
  ids2: number[] = [];

  getDebts() {
    // сбрасываем состояние перед загрузкой
    this.data = [];
    this.data2 = [];
    this.total = 0;
    this.total2 = 0;
    this.ids1 = [];
    this.ids2 = [];

    this.apiService.getDebts().subscribe((debts) => {
      const data = debts as DebtRes[];
      data.forEach((debt) => {
        if (debt.user === 1) {
          this.ids1.push(debt.id!);
          const { id, user, ...pure } = debt;
          this.data.push(pure);
          this.total += pure.sum;
        }
        if (debt.user === 2) {
          this.ids2.push(debt.id!);
          const { id, user, ...pure } = debt;
          this.data2.push(pure);
          this.total2 += pure.sum;
        }
      });

      // эмитим актуальные значения даже если массивы пустые
      this.dataChanged.next([...this.data]);
      this.data2Changed.next([...this.data2]);
      this.totalChanged.next(this.total);
      this.total2Changed.next(this.total2);
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
    this.total += sum;
    this.totalChanged.next(this.total);
    if (this.data.length > 8) {
      this.data = this.data.slice(-8);
      this.ids1 = this.ids1.slice(-8);
    }
    this.dataChanged.next([...this.data]);
    this.apiService.postDebts(date, sum, 1).subscribe((response) => {
      const data = response as DebtRes;
      this.ids1.push(data.id!);
    });

  }

  addNewDebt2(date: string, sum: number) {
    const newDebt = {
      date: date,
      sum: sum,
    };
    this.data2.push(newDebt);
    this.total2 += sum;
    this.total2Changed.next(this.total2);
    if (this.data2.length > 8) {
      this.data2 = this.data2.slice(-8);
      this.ids2 = this.ids2.slice(-8);
    }
    this.data2Changed.next(this.data2.slice());
    this.apiService.postDebts(date, sum, 2).subscribe((response) => {
      const data = response as DebtRes;
      this.ids2.push(data.id!);
    });

  }

  deleteDebts() {
    this.apiService.clearAllDebts().subscribe(() => {
      this.data = [];
      this.data2 = [];
      this.ids1 = [];
      this.ids2 = [];
      this.total = 0;
      this.total2 = 0;
      this.dataChanged.next([]);
      this.data2Changed.next([]);
      this.totalChanged.next(0);
      this.total2Changed.next(0);
      window.location.reload();
    });
  }

  deleteDebt(user: 1 | 2, index: number) {
    if (user === 1) {
      const id = this.ids1[index];
      const sum = this.data[index]?.sum ?? 0;
      this.apiService.deleteDebts(id).subscribe(() => {
        this.ids1.splice(index, 1);
        this.data.splice(index, 1);
        this.total -= sum;
        this.totalChanged.next(this.total);
        this.dataChanged.next([...this.data]);
      });
      return;
    }
    const id = this.ids2[index];
    const sum = this.data2[index]?.sum ?? 0;
    this.apiService.deleteDebts(id).subscribe(() => {
      this.ids2.splice(index, 1);
      this.data2.splice(index, 1);
      this.total2 -= sum;
      this.total2Changed.next(this.total2);
      this.data2Changed.next([...this.data2]);
    });
  }
}
