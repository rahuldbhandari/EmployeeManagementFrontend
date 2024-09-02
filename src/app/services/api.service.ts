import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get(url);
  }

  post(url: string, payload: any | null):Observable<any> {
    return this.http.post(url, payload);
  }


  put(url: string, payload: any):Observable<any> {
    return this.http.put(url, payload);
  }
  
  patch(url: string, payload: any):Observable<any> {
     
    return this.http.patch(url, payload);
  }

  delete(url: string) {
    return this.http.delete(url);
  }
}
