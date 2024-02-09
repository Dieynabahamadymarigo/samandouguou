import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPaginationComponent } from './card-pagination.component';

describe('CardPaginationComponent', () => {
  let component: CardPaginationComponent;
  let fixture: ComponentFixture<CardPaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardPaginationComponent]
    });
    fixture = TestBed.createComponent(CardPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
