import sgfs from './sgfs';
import pgns from './pgns';
import users from './users';
import gogames from './gogames';
import chessgames from './chessgames';
import email from './email';

export default function () {
  sgfs();
  pgns();
  users();
  gogames();
  chessgames();
  email();
}
