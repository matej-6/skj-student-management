import {Component, inject, input, OnInit, signal} from '@angular/core';
import {Student, StudentTemp} from '../student.type';
import {DatePipe} from '@angular/common';
import {BoolDoSKPipe} from '../../bool-do-sk.pipe';
import {StudentService} from '../student.service';
import {FormsModule} from '@angular/forms';
import {NezadefinovanePipe} from '../../nezadefinovane.pipe';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [DatePipe, BoolDoSKPipe, FormsModule, NezadefinovanePipe],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit{

  private studentService = inject(StudentService)

  student = input.required<Student>()

  odbory = StudentService.Odbory
  triedy = StudentService.Triedy
  pohlavia = StudentService.Pohlavia


  zobrazitDetaily = signal(false);
  zobrazitEdit = signal(false);


  switchDetaily(val: boolean) {
    this.zobrazitEdit.set(false);
    this.resetEdit()
    this.zobrazitDetaily.set(val);
  }

  switchEdit(val: boolean) {
    if (!val) {
      this.resetEdit();
    }
    this.zobrazitDetaily.set(false)
    this.zobrazitEdit.set(val)
  }

  odstranitOdbor(){
    this.model.odbor = undefined;
  }

  model: StudentTemp = {
    meno: undefined,
    priezvisko: undefined,
    pohlavie: undefined,
    info: undefined,
    disabled: undefined,
    trieda: undefined,
    datum_narodenia: undefined,
    odbor: undefined,
    priemer: undefined,
  }

  resetEdit() {
    this.model.meno = this.student().meno
    this.model.priezvisko = this.student().priezvisko
    this.model.trieda = this.student().trieda
    this.model.datum_narodenia = this.student().datum_narodenia ? new Date(this.student().datum_narodenia as Date).toISOString().substring(0, 10) : undefined;
    this.model.odbor = this.student().odbor
    this.model.info = this.student().info
    this.model.disabled = this.student().disabled
    this.model.pohlavie = this.student().pohlavie
    this.model.priemer = this.student().priemer ? Number(this.student().priemer) : undefined
  }


  resMessage = signal("")


  handleEdit() {
    if(!this.model.meno || !this.model.priemer) {
      return;
    }

    if (this.model.priemer && (this.model.priemer < 1 || this.model.priemer > 5)) {
      this.resMessage.set("Priemere musi byt medzi 1.00 a 5.00")
      return;
    }


    const res = this.studentService.editStudent(this.student()._id, this.model)
    if (res) {
      this.resMessage.set(res)
      return;
    }

    this.resMessage.set("")
    this.switchEdit(false);

    // console.log("edit finito")
  }

  zmazat(){
    this.studentService.removeStudent(this.student())
  }

  ngOnInit(): void {
    this.resetEdit()
  }

}
