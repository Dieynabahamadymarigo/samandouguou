import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionUtilisateurComponent } from './condition-utilisateur.component';
import { HttpClientModule } from '@angular/common/http';

describe('ConditionUtilisateurComponent', () => {
  let component: ConditionUtilisateurComponent;
  let fixture: ComponentFixture<ConditionUtilisateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConditionUtilisateurComponent],
      imports: [HttpClientModule],
    });
    fixture = TestBed.createComponent(ConditionUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
