import { inject, Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

  constructor() { }

  //GET
  get(endpoint: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}`);
  }

  //POST
  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data);
  }

  //PATCH
  put(endpoint: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${endpoint}`, data);
  }

  //DELETE
  delete(endpoint: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${endpoint}`);
  }
}
