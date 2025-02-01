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

  ids: number[] = [];

  getDebts() {
    this.apiService.getDebts().subscribe((debts) => {
      const data = debts as DebtRes[];
      data.forEach((debt) => {
        if (debt.user === 1) {
          this.ids.push(debt.id!);
          delete debt.id;
          delete debt.user;
          this.data.push(debt);
          this.total += debt.sum;
          this.totalChanged.next(this.total);
          this.dataChanged.next([...this.data]);
        }
        if (debt.user === 2) {
          this.ids.push(debt.id!);
          delete debt.id;
          delete debt.user;
          this.data2.push(debt);
          this.total2 += debt.sum;
          this.total2Changed.next(this.total2);
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
    this.total += sum;
    this.totalChanged.next(this.total);
    if (this.data.length > 8) {
      this.data = this.data.slice(-8);
    }
    this.dataChanged.next([...this.data]);
    this.apiService.postDebts(date, sum, 1).subscribe((response) => {
      console.log('Response from API: ', response);
      const data = response as DebtRes;
      this.ids.push(data.id!);
    });

    console.log(this.data, newDebt);
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
    }
    this.data2Changed.next(this.data2.slice());
    this.apiService.postDebts(date, sum, 2).subscribe((response) => {
      console.log('Response from API: ', response);
      const data = response as DebtRes;
      this.ids.push(data.id!);
    });

    console.log(this.data2, newDebt);
  }

  deleteDebts() {
    // for (const id of this.ids) {
    //   this.apiService.deleteDebts(id).subscribe((response) => {
    //     console.log('Response from API: ', response);
    //   });
    // }

    // this.ids.forEach((id) => {
    //   this.apiService.deleteDebts(id).subscribe((response) => {
    //     console.log('Response from API: ', response);
    //   });
    // });
    // window.location.reload();

    console.log(this.ids);

    from(this.ids)
      .pipe(
        concatMap((id) => this.apiService.deleteDebts(id)),
        finalize(() => {
          console.log('All debts are deleted');
          window.location.reload();
        })
      )
      .subscribe((response) => console.log('Deleted', response));
  }
}
