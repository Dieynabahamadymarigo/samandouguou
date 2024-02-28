import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilclientComponent } from './profilclient.component';
import { HttpClientModule } from '@angular/common/http';
import { AppModule } from 'src/app/app.module';

describe('ProfilclientComponent', () => {
  let component: ProfilclientComponent;
  let fixture: ComponentFixture<ProfilclientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilclientComponent],
      imports: [HttpClientModule,AppModule],
    });
    fixture = TestBed.createComponent(ProfilclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
