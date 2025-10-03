import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiInputNumber } from '@taiga-ui/kit';
import { AddDebtService } from '../add-debt.service';

@Component({
  selector: 'app-owe',
  imports: [FormsModule, TuiButton, TuiInputNumber, TuiTextfield],
  templateUrl: './owe.component.html',
  styleUrl: './owe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OweComponent {
  addDebtService = inject(AddDebtService);

  protected value: number = 1_00;

  protected onStep(step: number): void {
    this.value = Math.max(0, (this.value ?? 0) + step);
  }

  protected value2: number = 1_00;

  protected onStep2(step: number): void {
    this.value2 = Math.max(0, (this.value2 ?? 0) + step);
  }

  onAddDebt() {
    const date = new Date();
    const formatDate = date.toDateString().slice(4, 10);

    this.addDebtService.addNewDebt(formatDate, this.value);
    this.value = 1_00;
  }

  onAddDebt2() {
    const date = new Date();
    const formatDate = date.toDateString().slice(4, 10);

    this.addDebtService.addNewDebt2(formatDate, this.value2);
    this.value2 = 1_00;
  }
}
