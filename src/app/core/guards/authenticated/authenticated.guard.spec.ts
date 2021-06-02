import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../../services/authentication/authentication.service';

import { AuthenticatedGuard } from './authenticated.guard';

describe('AuthenticatedGuard', () => {
  let guard: AuthenticatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService],
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    guard = TestBed.inject(AuthenticatedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
