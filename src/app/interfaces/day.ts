export interface Day {
  _id?: string;
  user_id?: string;
  date?: Date;
  water?: number;
  weight?: number;
  sleep?: number;
  bloodPressure?: BloodPressure[];
}

export interface BloodPressure {
  systolic: number;
  diastolic: number;
  time?: string;
}
