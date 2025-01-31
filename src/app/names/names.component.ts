import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiTextfield, TuiButton } from '@taiga-ui/core';
import { TuiInputModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-names',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextfield,
    TuiTextfieldControllerModule,
    TuiButton,
  ],
  templateUrl: './names.component.html',
  styleUrl: './names.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NamesComponent implements OnInit {
  apiService = inject(ApiService);

  @ViewChild('saveNamesBtn', { static: false })
  saveNamesBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('errorNames', { static: false })
  errorNames!: ElementRef<HTMLParagraphElement>;

  protected readonly namesForm = new FormGroup({
    'name-1': new FormControl('', [Validators.required]),
    'name-2': new FormControl('', [Validators.required]),
  });

  namesBtnStyling(el: ElementRef, display: string, opacity: string) {
    el.nativeElement.style.display = display;
    el.nativeElement.clientHeight; // allows animation
    el.nativeElement.style.opacity = opacity;
  }

  ngOnInit(): void {
    this.namesForm.valueChanges.subscribe(() => {
      this.namesBtnStyling(this.saveNamesBtn, 'block', '1');
    });
  }

  initForm() {
    // let name1 = ''
    // let name2 = ''
    // this.namesForm.patchValue({})
  }

  onSaveNames() {
    if (!this.namesForm.valid) {
      this.namesBtnStyling(this.errorNames, 'block', '1');
      return;
    }

    console.log(this.namesForm.value); // {name-1: '', name-2: 'sdcds'}
    this.apiService
      .postNames(
        this.namesForm.value['name-1']!,
        this.namesForm.value['name-2']!
      )
      .subscribe((response) => console.log(response)); // {name1: 'aaa', name2: 'eee', id: 2}

    this.namesBtnStyling(this.saveNamesBtn, 'none', '0');
    this.namesBtnStyling(this.errorNames, 'none', '0');
  }
}
