import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private namesURL = 'https://c30ef54092f604b0.mokky.dev/names';

  constructor(private http: HttpClient) {}

  postNames(name1: string, name2: string) {
    const names = {
      name1: name1,
      name2: name2,
    };

    return this.http.post(this.namesURL, names);
  }
}
