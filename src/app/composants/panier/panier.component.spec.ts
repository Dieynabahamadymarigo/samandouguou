import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierComponent } from './panier.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('PanierComponent', () => {
  let component: PanierComponent;
  let fixture: ComponentFixture<PanierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanierComponent],
      imports: [HttpClientModule,FormsModule],
    });
    fixture = TestBed.createComponent(PanierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
