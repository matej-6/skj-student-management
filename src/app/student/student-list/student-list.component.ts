import {Component, inject} from '@angular/core';
import {StudentService} from '../student.service';
import {StudentComponent} from '../student/student.component';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    StudentComponent
  ],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {

  private studentService = inject(StudentService)

  students = this.studentService.filteredStudents

}
