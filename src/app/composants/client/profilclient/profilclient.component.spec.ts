import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilclientComponent } from './profilclient.component';

describe('ProfilclientComponent', () => {
  let component: ProfilclientComponent;
  let fixture: ComponentFixture<ProfilclientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilclientComponent]
    });
    fixture = TestBed.createComponent(ProfilclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
