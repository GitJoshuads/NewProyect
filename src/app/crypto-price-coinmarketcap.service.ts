import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CryptoPriceServiceCoinmarketcap {
  private apiUrl = '/api/v1/cryptocurrency/listings/latest';

  private headers = new HttpHeaders({
    'Accepts': 'application/json',
    'X-CMC_PRO_API_KEY': '85c8d00c-1f76-4c6f-b7dc-a7178caf1ec1',
  });

  constructor(private http: HttpClient) {}

  getCryptoData(): Observable<any> {
    const params = new HttpParams()
      .set('start', '1')
      .set('limit', '5000')
      .set('convert', 'USD');

    return this.http.get<any>(this.apiUrl, { headers: this.headers, params });
  }
}