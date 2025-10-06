import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InvestmentService } from '../../core/services/investment.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-investment-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div>
      <h3>My Investments</h3>
      <button (click)="goAdd()">Add New</button>
      <table>
        <thead>
          <tr>
            <th>Asset Type</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let inv of investments">
            <td>{{ inv.assetType }}</td>
            <td>{{ inv.quantity }}</td>
            <td>{{ inv.purchasePrice | currency }}</td>
            <td>{{ inv.purchaseDate | date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    table { width: 100%; border-collapse: collapse; }
    th, td { border: 1px solid #ddd; padding: 8px; }
  `]
})
export class InvestmentListComponent implements OnInit {
  investments:any[] = [];

  constructor(
    private invService: InvestmentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.invService.investments$.subscribe(list => {
      this.investments = list;
    });
  }

  goAdd() {
    this.router.navigate(['/investments/add']);
  }
}
