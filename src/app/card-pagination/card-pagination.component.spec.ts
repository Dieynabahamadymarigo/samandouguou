import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPaginationComponent } from './card-pagination.component';
import { HttpClientModule } from '@angular/common/http';

describe('CardPaginationComponent', () => {
  let component: CardPaginationComponent;
  let fixture: ComponentFixture<CardPaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardPaginationComponent],
      imports: [HttpClientModule],
    });
    fixture = TestBed.createComponent(CardPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
