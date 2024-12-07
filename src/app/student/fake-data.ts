import type {Student} from './student.type';

export const starterStudents: Student[] = [
  {
    meno: 'Jozko',
    priezvisko: 'Mrkvicka',
    datum_narodenia: new Date(2010, 1, 6),
    priemer: "1.77",
    trieda: '1.C',
    odbor: 'Elektrotechnika slaboprud',
    pohlavie: 'Muž',
    info: '',
    disabled: false,
    _id: 'jozkomrkvicka'
  },
  {
    meno: 'Janko',
    priezvisko: 'Hrasko',
    datum_narodenia: new Date(2008, 2, 3),
    priemer: "1.77",
    trieda: '3.C',
    odbor: 'Programovanie',
    pohlavie: 'Muž',
    info: '',
    disabled: false,
    _id: 'jankohrasko'
  },
];
