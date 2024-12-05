import { computed, Injectable, signal } from '@angular/core';
import { type Student } from './student.type';

const starterStudents: Student[] = [
  {
    meno: 'Jozko',
    priezvisko: 'Mrkvicka',
    datum_narodenia: new Date(2010, 1, 6),
    priemer: 1.77,
    trieda: '1.C',
    odbor: 'Medicina',
    pohlavie: 'Muz',
    info: '',
    disabled: false,
    last_edit: null,
  },
  {
    meno: 'Janko',
    priezvisko: 'Hrasko',
    datum_narodenia: new Date(2008, 2, 3),
    priemer: 1.77,
    trieda: '3.C',
    odbor: 'Chemia',
    pohlavie: 'Muz',
    info: '',
    disabled: false,
    last_edit: null,
  },
];

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private _students = signal(new Map<string, Student>());

  students = computed(() => {
    const studentsList = Array.from(this._students().values());

    studentsList.sort((a: Student, b: Student) => {
      if (this.getId(a) < this.getId(b)) {
        return -1;
      }
      if (this.getId(a) > this.getId(b)) {
        return 1;
      }
      return 0;
    });

    return studentsList;
  });

  constructor() {
    const savedStudents = localStorage.getItem('students');
    if (!savedStudents) {
      const newStudents = new Map<string, Student>();
      for (let i = 0; i < starterStudents.length; i++) {
        newStudents.set(this.getId(starterStudents[i]), starterStudents[i]);
      }
      this._students.set(newStudents);
      return;
    }
    try {
      const studentsMap: Map<string, Student> = JSON.parse(savedStudents);
      this._students.set(studentsMap);
    } catch {
      const newStudents = new Map<string, Student>();
      for (let i = 0; i < starterStudents.length; i++) {
        newStudents.set(this.getId(starterStudents[i]), starterStudents[i]);
      }
      this._students.set(newStudents);
    }
  }

  private getId(s: Student): string {
    return s.meno + s.priezvisko;
  }

  private saveToLocalStorage() {
    localStorage.setItem('students', JSON.stringify([...this._students()]));
  }
}
