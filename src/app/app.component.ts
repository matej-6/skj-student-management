import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { StudentService } from './student/student.service';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './auth/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'skj-student-management';

  private authService = inject(AuthService);

  isLoggedIn = this.authService.isAuthorized;
  showModal = this.authService.showModal;
  turnModal(val: boolean) {
    this.authService.turnModal(val);
  }
}
