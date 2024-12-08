import {Component, inject, signal} from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './auth/login/login.component';
import {StudentListComponent} from './student/student-list/student-list.component';
import {StudentFiltersComponent} from './student/student-filters/student-filters.component';
import {NewStudentFormComponent} from './student/new-student-form/new-student-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, LoginComponent, StudentListComponent, StudentFiltersComponent, NewStudentFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Student manazment';

  private authService = inject(AuthService);

  isLoggedIn = this.authService.isAuthorized;
  showModal = this.authService.showModal;
  turnModal(val: boolean) {
    this.authService.turnModal(val);
  }

  pridavanieStudenta = signal(false);

  setPridavanieStudenta(val: boolean) {
    this.pridavanieStudenta.set(val)
  }
}
