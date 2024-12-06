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
  private _students = signal(new Array<Student>());
  students = this._students.asReadonly();

  private selectedFilter = signal<Filter>('Meno a priezvisko');
  private searchVal = signal('');

  selectFilter(f: Filter) {
    this.selectedFilter.set(f);
  }

  updateSearchVal(newSearch: string) {
    this.searchVal.set(newSearch);
  }

  filteredStudents = computed(() => {
    switch (this.selectedFilter()) {
      case 'Meno a priezvisko':
        let filtered = this._students().filter((val) => {
          const map = val.meno + val.priezvisko;
          return (
            map.includes(this.searchVal()) ||
            val.meno.includes(this.searchVal()) ||
            val.priezvisko.includes(this.searchVal())
          );
        });
        return filtered;
      case 'Meno':
        filtered = this._students().filter((val) => {
          return val.meno.includes(this.searchVal());
        });
        return filtered;
      case 'Priezvisko':
        filtered = this._students().filter((val) =>
          val.priezvisko.includes(this.searchVal())
        );
        return filtered;

      default:
        this.sortStudents();
        return this._students();
    }
  });

  private sortStudents() {
    this._students.update((prev) => {
      prev.sort((a: Student, b: Student) => {
        if (this.getId(a) < this.getId(b)) {
          return -1;
        }
        if (this.getId(a) > this.getId(b)) {
          return 1;
        }
        return 0;
      });

      return prev;
    });
  }

  constructor() {
    const savedStudents = localStorage.getItem('students');
    if (!savedStudents) {
      const newStudents = new Array<Student>(starterStudents.length);
      for (let i = 0; i < starterStudents.length; i++) {
        newStudents[i] = starterStudents[i];
      }
      this._students.set(newStudents);
      return;
    }
    try {
      const studentsMap: Array<Student> = JSON.parse(savedStudents);
      this._students.set(studentsMap);
    } catch {
      const newStudents = new Array<Student>(starterStudents.length);
      for (let i = 0; i < starterStudents.length; i++) {
        newStudents[i] = starterStudents[i];
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

  addStudent(s: Student) {
    if (!s.meno || !s.priezvisko) {
      return;
    }

    this._students.update((prev) => {
      prev.push(s);
      return prev;
    });

    this.sortStudents();
  }

  filterByName() {}
}

type Filter = 'Meno a priezvisko' | 'Meno' | 'Priezvisko';
