export interface Day {
  _id?: string;
  user_id?: string;
  date?: Date;
  water?: number;
  weight?: number;
  sleep?: number;
  bloodPressure?: {
    systolic: number;
    diastolic: number;
  };
}
