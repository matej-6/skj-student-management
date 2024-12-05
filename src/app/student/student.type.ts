export type Student = {
  meno: string;
  priezvisko: string;
  datum_narodenia: Date;
  priemer: number;
  trieda: string;
  odbor: string;
  pohlavie: Pohlavie;
  info: string;
  disabled: boolean;
  last_edit: Date | null;
};

type Pohlavie = 'Muz' | 'Zena' | 'Ine';
