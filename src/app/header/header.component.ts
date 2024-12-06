import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ButtonComponent } from '../auth/button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private authService = inject(AuthService);

  isLoggedIn = this.authService.isAuthorized;

  signOut() {
    this.authService.signOut();
  }

  turnModal(val: boolean) {
    this.authService.turnModal(val);
  }
}
