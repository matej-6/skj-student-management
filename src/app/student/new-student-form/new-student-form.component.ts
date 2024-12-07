import {Component, inject, output, signal} from '@angular/core';
import {StudentService} from '../student.service';
import {StudentTemp} from '../student.type';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-new-student-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-student-form.component.html',
  styleUrl: './new-student-form.component.css'
})
export class NewStudentFormComponent {

  private studentService = inject(StudentService)

  pohlavia = StudentService.Pohlavia
  triedy = StudentService.Triedy
  odbory = StudentService.Odbory

  model: StudentTemp = {

  }

  resMessage = signal("")

  onSubmit() {
    if (!this.model.meno || !this.model.priezvisko) {
      this.resMessage.set("Musi mat meno a priezvisko")
    }

    const res = this.studentService.addStudent(this.model)

    if (res) {
      this.resMessage.set(res);
      return;
    }

    this.resMessage.set("")
    this.model = {}
    this.end.emit();

  }

  end = output()

}
