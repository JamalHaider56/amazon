import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeJournalComponent } from './trade-journal.component';

describe('TradeJournalComponent', () => {
  let component: TradeJournalComponent;
  let fixture: ComponentFixture<TradeJournalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeJournalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
