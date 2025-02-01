import { AsyncPipe, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiFormatNumberPipe } from '@taiga-ui/core';

@Component({
  selector: 'app-debt',
  imports: [AsyncPipe, NgForOf, TuiFormatNumberPipe, TuiTable],
  templateUrl: './debt.component.html',
  styleUrl: './debt.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebtComponent {
  protected readonly data = [
    {
      date: '12 Feb',
      sum: 1000,
    },
    {
      date: '3 Mar',
      sum: 300,
    },
  ] as const;

  protected readonly columns = Object.keys(this.data[0]);
}
