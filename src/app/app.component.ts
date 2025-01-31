import { Component } from '@angular/core';
import { TuiRoot } from '@taiga-ui/core';
import { NamesComponent } from './names/names.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TuiRoot, NamesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'IOU';
}
