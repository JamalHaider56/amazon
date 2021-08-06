import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeEntriesComponent } from './trade-entries.component';

describe('TradeEntriesComponent', () => {
  let component: TradeEntriesComponent;
  let fixture: ComponentFixture<TradeEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
