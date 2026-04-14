import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddDebtService } from '../add-debt.service';

@Component({
  selector: 'app-owe',
  imports: [FormsModule],
  templateUrl: './owe.component.html',
  styleUrl: './owe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OweComponent {
  addDebtService = inject(AddDebtService);

  protected value: number = 100;

  protected onStep(step: number): void {
    this.value = Math.max(0, (this.value ?? 0) + step);
  }

  protected value2: number = 100;

  protected onStep2(step: number): void {
    this.value2 = Math.max(0, (this.value2 ?? 0) + step);
  }

  onAddDebt() {
    const date = new Date();
    const formatDate = date.toDateString().slice(4, 10);

    const sum = Number(this.value) || 0;
    this.addDebtService.addNewDebt(formatDate, sum);
    this.value = 100;
  }

  onAddDebt2() {
    const date = new Date();
    const formatDate = date.toDateString().slice(4, 10);

    const sum = Number(this.value2) || 0;
    this.addDebtService.addNewDebt2(formatDate, sum);
    this.value2 = 100;
  }
}
