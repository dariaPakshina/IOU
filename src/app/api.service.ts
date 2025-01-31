import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

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
}
