import figlet from 'figlet';
import { VehicleModel } from './models/Vehicle/Vehicle.model';
import { ServerStarter } from './server/serverStarter';

figlet(`Fleet Management API`, (err: any, data: any) => {
    if (err) return console.log(`Something went wrong. Error: ${err}`);
    console.log(data);
});

console.log(process.env.MONGO_HOST);
const server: ServerStarter = new ServerStarter(8000, '0.0.0.0');
server.init();