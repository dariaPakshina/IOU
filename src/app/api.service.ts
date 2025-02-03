import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { TUI_DARK_MODE } from '@taiga-ui/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements OnInit {
  protected readonly darkMode = inject(TUI_DARK_MODE);

  constructor(private http: HttpClient) {
    this.versionObs.subscribe((versionChange) => {
      console.log('Version changed:', versionChange, this.versionObs);
      this.versionName = this.versionObs.value ? 'Dasha' : 'Alina';
      // window.localStorage.setItem('version-name', this.versionName);
    });

    const storedVersion = window.localStorage.getItem('version') === 'true';
    this.versionObs.next(storedVersion);

    console.log(this.versionName, this.versionObs.value);
    this.darkMode.set(this.versionObs.value === true);
  }

  versionObs = new BehaviorSubject<boolean>(true); // dasha (holds a value)
  versionObs$ = this.versionObs.asObservable();

  versionName!: string | null;

  debtURL = 'https://c30ef54092f604b0.mokky.dev/debt';
  debtAlinaURL = 'https://c30ef54092f604b0.mokky.dev/debt-alina';

  ngOnInit(): void {}

  toggleVersion() {
    const changedVersion = !this.versionObs.value;
    this.versionObs.next(changedVersion);
    window.localStorage.setItem('version', String(changedVersion));

    this.darkMode.set(this.versionName === 'Dasha');

    window.location.reload();
  }

  getURL() {
    return this.versionObs.value ? this.debtURL : this.debtAlinaURL;
  }

  postNames(name1: string, name2: string) {
    const namesURL = this.versionObs.value
      ? `https://c30ef54092f604b0.mokky.dev/names`
      : `https://c30ef54092f604b0.mokky.dev/names-alina`;
    const names = {
      name1: name1,
      name2: name2,
    };
    return this.http.post(namesURL, names);
  }

  getNames(id: number) {
    const namesURLid = this.versionObs.value
      ? `https://c30ef54092f604b0.mokky.dev/names/${id}`
      : `https://c30ef54092f604b0.mokky.dev/names-alina/${id}`;
    return this.http.get(namesURLid);
  }

  updateNames(id: number, newNames: object) {
    const namesURLid = this.versionObs.value
      ? `https://c30ef54092f604b0.mokky.dev/names/${id}`
      : `https://c30ef54092f604b0.mokky.dev/names-alina/${id}`;
    return this.http.patch(namesURLid, newNames);
  }

  //-------------------------------------------------------------------------------------------------------------------------------

  postDebts(date: string, sum: number, user: number) {
    const debt = {
      date: date,
      sum: sum,
      user: user,
    };
    return this.http.post(this.getURL(), debt);
  }

  getDebts() {
    return this.http.get(this.getURL());
  }

  deleteDebts(id: number) {
    const debtsURLid = this.versionObs.value
      ? `https://c30ef54092f604b0.mokky.dev/debt/${id}`
      : `https://c30ef54092f604b0.mokky.dev/debt-alina/${id}`;
    return this.http.delete(debtsURLid);
  }
}
