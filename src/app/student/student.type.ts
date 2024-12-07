import {StudentService} from './student.service';

export type Filter = typeof StudentService.DostupneFiltre[number];
export type Trieda = typeof StudentService.Triedy[number]
export type Pohlavie = typeof StudentService.Pohlavia[number];
export type Odbor = typeof StudentService.Odbory[number];


export type Student = {
  _id: string;
  meno: string;
  priezvisko: string;
  datum_narodenia?: Date;
  priemer?: string;
  trieda?: Trieda;
  odbor?: Odbor;
  pohlavie?: Pohlavie;
  info?: string;
  disabled?: boolean;
  last_edit?: Date;
};


export type StudentTemp = {
  meno?: string;
  priezvisko?: string;
  datum_narodenia?: string;
  priemer?: number;
  trieda?: Trieda;
  odbor?: Odbor;
  pohlavie?: Pohlavie;
  info?: string;
  disabled?: boolean;
}
