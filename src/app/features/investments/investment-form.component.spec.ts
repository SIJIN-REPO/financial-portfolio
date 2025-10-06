import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvestmentFormComponent } from './investment-form.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { provideMockStore } from '@ngrx/store/testing'; // optional if using store
import { InvestmentService } from '../../core/services/investment.service';
import { of } from 'rxjs';

fdescribe('InvestmentFormComponent', () => {
  let component: InvestmentFormComponent;
  let fixture: ComponentFixture<InvestmentFormComponent>;
  let invServiceSpy: jasmine.SpyObj<InvestmentService>;

  beforeEach(async () => {
    invServiceSpy = jasmine.createSpyObj('InvestmentService', ['addInvestment']);

    await TestBed.configureTestingModule({
      imports: [InvestmentFormComponent, ReactiveFormsModule],
      providers: [
        { provide: InvestmentService, useValue: invServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InvestmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('quantity must be > 0', () => {
    component.form.controls['assetType'].setValue('stock');
    component.form.controls['quantity'].setValue(0);
    component.form.controls['purchasePrice'].setValue(100);
    component.form.controls['purchaseDate'].setValue('2025-10-05');
    expect(component.form.valid).toBeFalse();
    component.form.controls['quantity'].setValue(10);
    expect(component.form.valid).toBeTrue();
  });

  it('submit adds investment', () => {
    invServiceSpy.addInvestment.and.returnValue(of({
      id: '1',
      assetType: 'stock',
      quantity: 5,
      purchasePrice: 200,
      purchaseDate: '2025-10-05'
    }));
    component.form.controls['assetType'].setValue('stock');
    component.form.controls['quantity'].setValue(5);
    component.form.controls['purchasePrice'].setValue(200);
    component.form.controls['purchaseDate'].setValue('2025-10-05');

    component.confirm();
    expect(invServiceSpy.addInvestment).toHaveBeenCalled();
  });
});
