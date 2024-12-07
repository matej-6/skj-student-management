import {computed, DestroyRef, effect, inject, Injectable, signal,} from '@angular/core';
import {Filter, type Student, StudentTemp} from './student.type';
import {starterStudents} from './fake-data';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private destroyRef = inject(DestroyRef);

  private _students = signal(new Array<Student>());
  students = this._students.asReadonly();

  private _selectedFilter = signal<Filter>('Meno a priezvisko');
  selectedFilter = this._selectedFilter.asReadonly();
  private searchVal = signal('');

  selectFilter(f: Filter) {
    this._selectedFilter.set(f);
    console.log(this._selectedFilter());
  }

  updateSearchVal(newSearch: string) {
    this.searchVal.set(newSearch);
    console.log("search:" ,this.searchVal());
  }

  filteredStudents = computed(() => {
    switch (this._selectedFilter()) {
      case 'Meno a priezvisko':
        return this._students().filter((val) => {
          const map = (val.meno + " " + val.priezvisko).toLowerCase();
          return (
            map.startsWith(this.searchVal()) ||
            val.meno.toLowerCase().startsWith(this.searchVal()) ||
            val.priezvisko.toLowerCase().startsWith(this.searchVal())
          );
        });
      case 'Meno':
        return this._students().filter((val) => {
          return val.meno.toLowerCase().startsWith(this.searchVal());
        });
      case 'Priezvisko':
        return this._students().filter((val) =>
          val.priezvisko.toLowerCase().startsWith(this.searchVal())
        );

      default:
        this.sortStudents();
        return this._students();
    }
  });

  private sortStudents() {
    this._students.update((prev) => {
      prev.sort((a: Student, b: Student) => {
        if (a.priezvisko < b.priezvisko) {
          return -1;
        }
        if (a.priezvisko > b.priezvisko) {
          return 1;
        }
        return 0;
      });

      return prev;
    });
  }

  constructor() {
    const onStudentChange = effect(() => {
      localStorage.setItem('students', JSON.stringify([...this._students()]));
    });

    this.destroyRef.onDestroy(() => {
      onStudentChange.destroy();
    });

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
    return s._id.toLowerCase();
  }

  private genId(meno: string, priezvisko :string): string {
    return meno.concat(priezvisko).toLowerCase();
  }

  isAvailable(meno: string, priezvisko: string) {
    const sid = meno.toLowerCase().concat(priezvisko.toLowerCase());
    return !this._students().find(
      (val) => this.getId(val) == sid
    );
  }



  addStudent(newStudent: StudentTemp): string | undefined {
    if (!newStudent.meno || !newStudent.priezvisko) {
      return;
    }


    if (!this.isAvailable(newStudent.meno!, newStudent.priezvisko!)) {
      return "Meno a priezvisko musia nesmu byt pouzite."
    }

    this._students.update((prev) => {
      prev.push({
        _id: this.genId(newStudent.meno!, newStudent.priezvisko!),
        meno: newStudent.meno!,
        priezvisko: newStudent.priezvisko!,
        priemer: newStudent.priemer?.toFixed(2),
        datum_narodenia: newStudent.datum_narodenia ? new Date(newStudent.datum_narodenia!) : undefined,
        pohlavie: newStudent.pohlavie,
        odbor: newStudent.odbor,
        trieda: newStudent.trieda,
        disabled: newStudent.disabled,
        info: newStudent.info,
      })
      return [...prev]
    })


    return;
  }


  editStudent(sid: string, editedStudent: StudentTemp): string | undefined {

    if (!editedStudent.meno || !editedStudent.priezvisko) {
      return "Musi mat meno a priezvisko."
    }


    const jeVolne = this.isAvailable(editedStudent.meno, editedStudent.priezvisko)

    const originalStudent = this._students().find(val => val._id === sid)

    if (!jeVolne && editedStudent.meno !== originalStudent?.meno && editedStudent.priezvisko !== originalStudent?.priezvisko) {
      return "Meno a priezvikso su uz pouzite."
    }


    this._students.update(prev => {
      return prev.map(val => {
        if (val._id === sid) {
          val._id = this.genId(editedStudent.meno!, editedStudent.priezvisko!);
          val.meno = editedStudent.meno!;
          val.priezvisko = editedStudent.priezvisko!;
          val.priemer = editedStudent.priemer?.toFixed(2);
          val.datum_narodenia = editedStudent.datum_narodenia ? new Date(editedStudent.datum_narodenia!) : val.datum_narodenia;
          val.pohlavie = editedStudent.pohlavie;
          val.odbor = editedStudent.odbor;
          val.trieda = editedStudent.trieda;
          val.disabled = editedStudent.disabled;
          val.info = editedStudent.info;

          val.last_edit = new Date(Date.now())
        }

        return val;
      })
    })





    return;
  }



  removeStudent(s: Student) {
    if (!s) {
      return;
    }

    const remId = this.getId(s);


    this._students.update((prev) => {
      return prev.filter((val) => this.getId(val) != remId);
    });
  }

  static DostupneFiltre = ['Meno a priezvisko' , 'Meno' , 'Priezvisko'] as const;
  static Triedy = ['1.A', '1.B', '1.C', '1.D', '2.A', '2.B', '2.C', '2.D', '3.A', '3.B', '3.C', '3.D', '4.A', '4.B', '4.C', '4.D'] as const;
  static Pohlavia = ['Muž', 'Žena', 'Iné'] as const;
  static Odbory = ["Elektrotechnika silnoprud", "Elektrotechnika slaboprud", "Medicina", "Programovanie"] as const

}

