import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: jasmine.SpyObj<LoginService>;


  beforeEach(() => {
    // loginService = jasmine.createSpyObj('LoginService', ['connection']);
    // loginService.connection.and.returnValue(of({ user: { role_id: '2' }, token: 'fakeToken' }));

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientModule,FormsModule],
      providers: [{ provide: LoginService, useValue: loginService }],

    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
