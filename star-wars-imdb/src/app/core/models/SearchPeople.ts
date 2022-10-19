import { Person } from './Person';

export interface SearchPeople {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}
