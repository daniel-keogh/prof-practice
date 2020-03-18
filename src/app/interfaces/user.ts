import { Day } from './day';

export interface User {
  _id: string;
  name: string;
  email: string;
  days: Day[];
  registered_since: Date;
}
