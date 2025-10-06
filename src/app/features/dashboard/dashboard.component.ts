import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { InvestmentService } from '../../core/services/investment.service';
import { map } from 'rxjs/operators';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective,RouterModule],
  template: `
    <div class="dashboard-container">
      <h2>Portfolio Dashboard</h2>
      <div class="charts-row">
        <div class="chart-card">
          <h3>Asset Allocation</h3>
          <canvas baseChart
            [data]="pieChartData"
            [type]="pieChartType">
          </canvas>
        </div>
        <div class="chart-card">
          <h3>Performance Over Time</h3>
          <canvas baseChart
            [data]="lineChartData"
            [options]="lineChartOptions"
            [type]="lineChartType">
          </canvas>
        </div>
      </div>
      <div class="metrics-row">
        <div>Total Value: {{ totalValue | currency }}</div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container { padding: 16px; }
    .charts-row { display: flex; flex-wrap: wrap; gap: 16px; }
    .chart-card { flex: 1 1 300px; }
    .metrics-row { margin-top: 24px; }
  `]
})
export class DashboardComponent implements OnInit {
  pieChartType: ChartType = 'pie';
  pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: []
  };

  lineChartType: ChartType = 'line';
  lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: []
  };
  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {}
    }
  };

  totalValue = 0;

  constructor(private invService: InvestmentService) { }

  ngOnInit(): void {
    this.invService.investments$.pipe(
      map(invs => {
      // compute allocations
        const byType = invs.reduce((acc, inv) => {
          acc[inv.assetType] = (acc[inv.assetType] || 0)
            + inv.quantity * inv.purchasePrice;
          return acc;
        }, {} as Record<string, number>);

        const labels = Object.keys(byType);
        const data = Object.values(byType);

        this.pieChartData = {
          labels,
          datasets: [
            { data, label: 'Asset Allocation' }
          ]
        };

        // for line chart: mock historical by simple cumulative
        const sorted = invs.sort((a, b) => new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime());
        const labelsLine: string[] = [];
        const valuesLine: number[] = [];
        let cum = 0;
        sorted.forEach(inv => {
          cum += inv.quantity * inv.purchasePrice;
          labelsLine.push(inv.purchaseDate.substring(0, 10));
          valuesLine.push(cum);
        });
        this.lineChartData = {
          labels: labelsLine,
          datasets: [
            { data: valuesLine, label: 'Portfolio Value' }
          ]
        };

        this.totalValue = data.reduce((a, b) => a + b, 0);
      })
    ).subscribe();
  }
}
