import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiInputNumber } from '@taiga-ui/kit';

@Component({
  selector: 'app-owe',
  imports: [FormsModule, TuiButton, TuiInputNumber, TuiTextfield],
  templateUrl: './owe.component.html',
  styleUrl: './owe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OweComponent {
  protected value: number | null = 1_00;

  protected onStep(step: number): void {
    this.value = Math.max(0, (this.value ?? 0) + step);
  }

  protected value2: number | null = 1_00;

  protected onStep2(step: number): void {
    this.value2 = Math.max(0, (this.value2 ?? 0) + step);
  }
}
