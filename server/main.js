import configureCdn from './configs/configure_cdn.js';
import configureServices from './configs/configure_services.js';
import configureEmail from './configs/configure_email.js';

import publications from './publications';
import methods from './methods';
import addInitialData from './configs/initial_adds.js';
import addInitialUsers from './configs/initial_users.js';

configureCdn();
configureServices();
configureEmail();

publications();
methods();
addInitialData();
addInitialUsers();

