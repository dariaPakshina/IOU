import { Component, inject } from '@angular/core';
import { TUI_DARK_MODE, TuiRoot } from '@taiga-ui/core';
import { NamesComponent } from './names/names.component';
import { OweComponent } from './owe/owe.component';
import { DebtComponent } from './debt/debt.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TuiRoot, NamesComponent, OweComponent, DebtComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'IOU';
  protected readonly darkMode = inject(TUI_DARK_MODE);
}
