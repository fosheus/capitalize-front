import { Component } from '@angular/core';
import { AuthenticationService } from './core/services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'capitalize-front';

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.getUser();
  }
}
