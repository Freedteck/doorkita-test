import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderModalComponent } from './view-order-modal.component';

describe('ViewOrderModalComponent', () => {
  let component: ViewOrderModalComponent;
  let fixture: ComponentFixture<ViewOrderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOrderModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOrderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
