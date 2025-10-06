import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Investment } from '../../models/investment.model';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  private _investments$ = new BehaviorSubject<Investment[]>([]);
  investments$ = this._investments$.asObservable();

  constructor(private http: HttpClient) {
    this.loadAll();
  }

  loadAll(): void {
    // I have passing the dummydata for piechart
    const dummyData = [
    { id: '', assetType: 'Stocks', quantity: 50, purchasePrice: 100, purchaseDate: '2024-01-15' },
    { id: '',assetType: 'Bonds', quantity: 30, purchasePrice: 150, purchaseDate: '2024-03-01' },
    { id: '',assetType: 'Crypto', quantity: 10, purchasePrice: 2000, purchaseDate: '2024-05-20' }
  ];
      this._investments$.next(dummyData);


    //   Can call if the backend is working
    
    // this.http.get<Investment[]>('/api/investments').subscribe(list => {
    //   this._investments$.next(list);
    // });
  }

  addInvestment(inv: Investment): Observable<Investment> {
   // I have added the dummydata for addInvestment
    const dummyAddInvestmentData = [{ id: '1', assetType: 'Stocks', quantity: 50, purchasePrice: 100, purchaseDate: '2024-01-15' },
        { id: '2', assetType: 'bond', quantity: 30, purchasePrice: 200, purchaseDate: '2024-01-15' },
        { id: '3', assetType: 'crypto', quantity: 20, purchasePrice: 250, purchaseDate: '2024-01-15' },
        { id: '4', assetType: 'mutual-fund', quantity: 60, purchasePrice: 300, purchaseDate: '2024-01-15' },
    ]
    this._investments$.next([...dummyAddInvestmentData]);

    // Don't have the backend data So added above dummydata
    return this.http.post<Investment>('/api/investments', inv).pipe(
      tap(saved => {
        const cur = this._investments$.value;
        this._investments$.next([...cur, saved]);
      })
    );
  }
}
