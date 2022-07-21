import { User } from './user';
import { Policy } from './policy';
export class Transaction {
  id: number;
  policy: Policy;
  user: User;
  purchaseDate: Date;
}
