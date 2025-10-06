import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'investments',
    loadComponent: () =>
      import('./features/investments/investment-list.component').then(m => m.InvestmentListComponent)
  },
  {
    path: 'investments/add',
    loadComponent: () =>
      import('./features/investments/investment-form.component').then(m => m.InvestmentFormComponent)
  },
  // wildcard route
  { path: '**', redirectTo: '' }
];

