import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get<T = any>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  post<T = any>(url: string, payload: any | null): Observable<T> {
    return this.http.post<T>(url, payload);
  }
}
