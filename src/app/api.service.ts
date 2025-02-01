import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Debt } from './debt.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  debtURL = 'https://c30ef54092f604b0.mokky.dev/debt';

  postNames(name1: string, name2: string) {
    const namesURL = 'https://c30ef54092f604b0.mokky.dev/names';
    const names = {
      name1: name1,
      name2: name2,
    };
    return this.http.post(namesURL, names);
  }

  getNames(id: number) {
    const namesURLid = `https://c30ef54092f604b0.mokky.dev/names/${id}`;
    return this.http.get(namesURLid);
  }

  updateNames(id: number, newNames: object) {
    const namesURLid = `https://c30ef54092f604b0.mokky.dev/names/${id}`;
    return this.http.patch(namesURLid, newNames);
  }

  postDebts(date: string, sum: number, user: number) {
    const debt = {
      date: date,
      sum: sum,
      user: user,
    };
    return this.http.post(this.debtURL, debt);
  }

  getDebts() {
    return this.http.get(this.debtURL);
  }

  updateDebts(newDebts: Debt[]) {
    return this.http.patch(this.debtURL, newDebts);
  }

  deleteDebts(id: number) {
    const debtsURLid = `https://c30ef54092f604b0.mokky.dev/debt/${id}`;
    return this.http.delete(debtsURLid);
  }
}
