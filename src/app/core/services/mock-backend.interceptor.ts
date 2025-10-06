import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';
import { Investment } from '../../models/investment.model';

@Injectable({
  providedIn: 'root'
})
export class MockBackendInterceptor implements HttpInterceptor {
  private investments: Investment[] = [];

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // small delay to simulate network
    return of(null).pipe(
      delay(500),
      mergeMap(() => {
        // handle routes
        if (req.url.endsWith('/api/investments') && req.method === 'GET') {
          return of(new HttpResponse({ status: 200, body: this.investments }));
        }
        if (req.url.endsWith('/api/investments') && req.method === 'POST') {
          const inv = req.body as Investment;
          inv.id = (Math.random() * 1000000).toFixed(0);
          this.investments.push(inv);
          return of(new HttpResponse({ status: 201, body: inv }));
        }
        // fallback to real HTTP
        return next.handle(req);
      })
    );
  }
}
