import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../api.service';
import { Names } from '../names.model';
import { catchError, of, skip } from 'rxjs';
import { AddDebtService } from '../add-debt.service';

@Component({
  selector: 'app-names',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './names.component.html',
  styleUrl: './names.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NamesComponent implements OnInit {
  apiService = inject(ApiService);
  addDebtService = inject(AddDebtService);
  editingMode = false;
  lastID!: number;

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
    this.lastID = 2;
    this.apiService
      .getNames(2)
      .pipe(catchError(() => of(null)))
      .subscribe((response) => {
        if (response) {
          this.namesForm.valueChanges.pipe(skip(1)).subscribe(() => {
            this.namesBtnStyling(this.saveNamesBtn, 'block', '1');
          });

          const data = response as Names;
          this.namesForm.patchValue({
            'name-1': data.name1,
            'name-2': data.name2,
          });
          this.addDebtService.name1 = data.name1;
          this.addDebtService.name2 = data.name2;
        } else {
          this.namesForm.valueChanges.subscribe(() => {
            this.namesBtnStyling(this.saveNamesBtn, 'block', '1');
          });
        }
      });
  }

  onSaveNames() {
    if (!this.namesForm.valid) {
      this.namesBtnStyling(this.errorNames, 'block', '1');
      return;
    }

    const newNames = {
      name1: this.namesForm.value['name-1']!,
      name2: this.namesForm.value['name-2']!,
    };
    this.apiService.updateNames(2, newNames).subscribe();

    this.addDebtService.name1 = newNames.name1;
    this.addDebtService.name2 = newNames.name2;
    // } else {
    // this.apiService
    //   .postNames(
    //     this.namesForm.value['name-1']!,
    //     this.namesForm.value['name-2']!
    //   )
    //   .subscribe((response) => {
    //     console.log('Response from API: ', response);
    //     const data = response as Names;
    //     this.lastID = data.id;
    //     window.localStorage.setItem('id', this.lastID.toString());
    //     console.log(
    //       'ID set: ',
    //       this.lastID,
    //       +window.localStorage.getItem('id')!
    //     );
    //   }); // {name1: 'aaa', name2: 'eee', id: 2}

    this.namesBtnStyling(this.saveNamesBtn, 'none', '0');
    this.namesBtnStyling(this.errorNames, 'none', '0');
  }
}
