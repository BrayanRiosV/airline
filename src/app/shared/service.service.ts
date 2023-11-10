import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'https://v6.exchangerate-api.com/v6/0e9d82cecd0e72cd6769362d/latest/USD';

  constructor(private http: HttpClient) { }

  actionGet(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  getExchangeRates(baseCurrency: string): Observable<any> {
    const url = this.apiUrl;
    return this.http.get<any>(url);
  }

}
