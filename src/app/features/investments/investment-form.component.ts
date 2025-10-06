import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InvestmentService } from '../../core/services/investment.service';
import { Investment } from '../../models/investment.model';

@Component({
  selector: 'app-investment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-container">
      <h3>Add Investment</h3>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <label>
          Asset Type:
          <select formControlName="assetType">
            <option *ngFor="let t of types" [value]="t">{{ t }}</option>
          </select>
        </label>
        <div *ngIf="form.get('assetType')?.invalid && form.get('assetType')?.touched">
          Asset Type is required
        </div>

        <label>
          Quantity:
          <input type="number" formControlName="quantity" />
        </label>
        <div *ngIf="form.get('quantity')?.invalid && form.get('quantity')?.touched">
          Enter valid quantity &gt; 0
        </div>

        <label>
          Purchase Price:
          <input type="number" formControlName="purchasePrice" />
        </label>
        <div *ngIf="form.get('purchasePrice')?.invalid && form.get('purchasePrice')?.touched">
          Enter valid price
        </div>

        <label>
          Purchase Date:
          <input type="date" formControlName="purchaseDate" />
        </label>
        <div *ngIf="form.get('purchaseDate')?.invalid && form.get('purchaseDate')?.touched">
          Date is required
        </div>

        <button type="button" (click)="onReview()" [disabled]="form.invalid">Review</button>
      </form>

      <div *ngIf="reviewing">
        <h4>Review</h4>
        <pre>{{ form.value | json }}</pre>
        <button (click)="confirm()">Confirm</button>
        <button (click)="cancel()">Cancel</button>
      </div>
    </div>
  `,
  styles: [`
    .form-container { max-width: 400px; margin: auto; padding: 16px; }
    label { display: block; margin: 8px 0; }
    input, select { width: 100%; }
    .reviewing { margin-top: 16px; background: #f9f9f9; padding: 8px; }
  `]
})
export class InvestmentFormComponent {
  types = ['stock', 'bond', 'crypto', 'mutual-fund', 'etf'] as const;

  reviewing = false;
form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private invService: InvestmentService,
    private router: Router
  ) { }

    ngOnInit(): void {
  this.form = this.fb.group({
    assetType: ['', Validators.required],
    quantity: [0, [Validators.required, Validators.min(1)]],
    purchasePrice: [0, [Validators.required, Validators.min(0.01)]],
    purchaseDate: ['', Validators.required]
  });
  }

  onReview() {
    this.reviewing = true;
  }

  confirm() {
    if (this.form.valid) {
      const inv: Investment = {
        ...this.form.value,
        id: '' // will be set by backend
      } as any;
      this.router.navigate(['/']); // i have used for the static use.
      this.invService.addInvestment(inv).subscribe({
        next: () => {
          this.router.navigate(['/']);
        }
      });
    }
  }

  cancel() {
    this.reviewing = false;
  }

  onSubmit() {
    // not used; we use review → confirm
  }
}
