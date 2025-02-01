import { NgForOf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TuiTable } from '@taiga-ui/addon-table';
import { AddDebtService } from '../add-debt.service';
import { Debt } from '../debt.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-debt',
  imports: [NgForOf, TuiTable],
  templateUrl: './debt.component.html',
  styleUrl: './debt.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebtComponent implements OnInit, OnDestroy {
  addDebtService = inject(AddDebtService);
  subscription!: Subscription;
  subscription2!: Subscription;

  data: Debt[] = [];
  data2: Debt[] = [];

  columns!: any;
  columns2!: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.data = this.addDebtService.getDebts();
    this.data2 = this.addDebtService.getDebts2();

    if (this.data.length > 0) {
      this.columns = Object.keys(this.data[0]);
    }
    if (this.data2.length > 0) {
      this.columns2 = Object.keys(this.data2[0]);
    }

    this.subscription = this.addDebtService.dataChanged.subscribe(
      (debts: Debt[]) => {
        this.data = [...debts];
        this.cdr.detectChanges();
        if (debts.length > 0) {
          this.columns = Object.keys(debts[0]);
        }
      }
    );

    this.subscription2 = this.addDebtService.data2Changed.subscribe(
      (debts: Debt[]) => {
        this.data2 = [...debts];
        this.cdr.detectChanges();
        if (debts.length > 0) {
          this.columns2 = Object.keys(debts[0]);
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
  }
}
