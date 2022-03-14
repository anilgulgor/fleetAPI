import { startConnection } from '../helpers/mongoClient';

// start db connection
startConnection();

require('./vehicle.spec');
require('./deliveryPoint.spec');
require('./bag.spec');
require('./package.spec');
require('./assign.spec');
require('./attemptToDeliver.spec');
require('./expected.spec');