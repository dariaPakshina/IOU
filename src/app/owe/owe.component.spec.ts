import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OweComponent } from './owe.component';

describe('OweComponent', () => {
  let component: OweComponent;
  let fixture: ComponentFixture<OweComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OweComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OweComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
