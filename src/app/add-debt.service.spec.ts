import { TestBed } from '@angular/core/testing';

import { AddDebtService } from './add-debt.service';

describe('AddDebtService', () => {
  let service: AddDebtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddDebtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
