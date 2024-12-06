import { Component, inject, NgModule, signal } from '@angular/core';
import { AuthService, PASSWORD } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private authService = inject(AuthService);

  PASSWORD = PASSWORD;

  hesloInputMessage = signal('');

  hesloInput = '';

  signIn() {
    const res = this.authService.logIn(this.hesloInput);
    if (res) {
      this.hesloInputMessage.set(res);
    }
  }
}
