import { NgForOf, NgIf } from '@angular/common';
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
import { TuiChip } from '@taiga-ui/kit';
import {
  TuiButton,
  TuiIcon,
  TuiLoader,
  tuiLoaderOptionsProvider,
  TuiOption,
} from '@taiga-ui/core';

@Component({
  selector: 'app-debt',
  imports: [NgForOf, TuiTable, TuiChip, TuiButton, TuiLoader, NgIf],
  templateUrl: './debt.component.html',
  styleUrl: './debt.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebtComponent implements OnInit, OnDestroy {
  addDebtService = inject(AddDebtService);
  subscription!: Subscription;
  subscription2!: Subscription;
  subscription3!: Subscription;
  subscription4!: Subscription;

  data: Debt[] = [];
  data2: Debt[] = [];

  columns!: any;
  columns2!: any;

  total = 0;
  total2 = 0;

  final = 0;
  whoOwes!: string;
  toWhomOwe!: string;

  loading = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loading = true;

    this.data = this.addDebtService.getDebts().slice(-5);
    this.data2 = this.addDebtService.getDebts2().slice(-5);

    if (this.data.length > 0) {
      this.columns = Object.keys(this.data[0]);
    }
    if (this.data2.length > 0) {
      this.columns2 = Object.keys(this.data2[0]);
    }

    this.subscription = this.addDebtService.dataChanged.subscribe(
      (debts: Debt[]) => {
        this.data = [...debts].slice(-5);
        this.cdr.detectChanges();
        if (debts.length > 0) {
          this.columns = Object.keys(debts[0]);
        }
      }
    );

    this.subscription2 = this.addDebtService.data2Changed.subscribe(
      (debts: Debt[]) => {
        this.data2 = [...debts].slice(-5);
        this.cdr.detectChanges();
        if (debts.length > 0) {
          this.columns2 = Object.keys(debts[0]);
        }
      }
    );

    this.subscription3 = this.addDebtService.totalChanged.subscribe(
      (total: any) => {
        this.total = total;
      }
    );
    this.subscription4 = this.addDebtService.total2Changed.subscribe(
      (total: any) => {
        this.total2 = total;
      }
    );

    this.onCount();
  }

  onCount() {
    if (this.total > this.total2) {
      this.final = this.total - this.total2;
      this.whoOwes = this.addDebtService.name1;
      this.toWhomOwe = '';
    }
    if (this.total < this.total2) {
      this.final = this.total2 - this.total;
      this.whoOwes = this.addDebtService.name2;
      this.toWhomOwe = '';
    }
    if (this.total === this.total2) {
      this.final = 0;
      this.whoOwes = 'Никто не ';
      this.toWhomOwe = '';
    }

    this.loading = false;
  }

  onZero() {
    this.loading = true;
    this.addDebtService.deleteDebts();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
    if (this.subscription3) {
      this.subscription3.unsubscribe();
    }
    if (this.subscription4) {
      this.subscription4.unsubscribe();
    }
  }
}
