import { inject, Injectable, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { DebtRes } from './debt.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements OnInit {
  ngOnInit(): void {}

  postNames(name1: string, name2: string) {
    const names = { id: 2, name1, name2 };
    window.localStorage.setItem('names', JSON.stringify(names));
    return of(names);
  }

  getNames(id: number) {
    const raw = window.localStorage.getItem('names');
    if (raw) {
      return of(JSON.parse(raw));
    }
    const defaults = { id: 2, name1: '', name2: '' };
    return of(defaults);
  }

  updateNames(id: number, newNames: object) {
    const toSave = { id: 2, ...(newNames as any) };
    window.localStorage.setItem('names', JSON.stringify(toSave));
    return of(toSave);
  }

  private readDebts(): DebtRes[] {
    const raw = window.localStorage.getItem('debts');
    return raw ? (JSON.parse(raw) as DebtRes[]) : [];
  }

  private writeDebts(items: DebtRes[]) {
    window.localStorage.setItem('debts', JSON.stringify(items));
  }

  private nextId(items: DebtRes[]): number {
    const max = items.reduce((acc, it) => (it.id && it.id > acc ? it.id : acc), 0);
    return max + 1;
  }

  postDebts(date: string, sum: number, user: number) {
    const debts = this.readDebts();
    const newItem: DebtRes = { id: this.nextId(debts), date, sum, user };
    debts.push(newItem);
    this.writeDebts(debts);
    return of(newItem);
  }

  getDebts() {
    const debts = this.readDebts();
    return of(debts);
  }

  deleteDebts(id: number) {
    const debts = this.readDebts().filter((it) => it.id !== id);
    this.writeDebts(debts);
    return of({ id });
  }

  clearAllDebts() {
    window.localStorage.removeItem('debts');
    return of(true);
  }
}
