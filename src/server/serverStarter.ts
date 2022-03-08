import * as hapi from '@hapi/hapi';
import * as glob from 'glob';
import * as path from 'path';
import { ServerPlugins } from './serverPlugins';

export class ServerStarter {

    public port: number;
    public host: string;
    private server!: hapi.Server;

    constructor(port: number, host: string) {
        this.port = port;
        this.host = host;
    }

    public async init() {

        this.server = new hapi.Server({
            port: this.port,
            host: this.host
        }); 

        await this.register();

        this.setRoutes();

        this.start();

    }

    private async register() {
        return new Promise<void>((resolve, reject) => {
            this.server.register(ServerPlugins).then(() => {
                console.log('Server Plugins registered successfully');
                resolve();
            }).catch((err) => {
                console.log(`An error has occured while registering Server Plugins. Error: ${err}`);
                reject(err);
            })
        })
    }

    private setRoutes() {

        glob.sync('/../api/**/routes.*', { root: __dirname }).forEach((file) => {
			const routes: Array<hapi.ServerRoute> = require(path.join(file)).routes;
			try {
				this.server.route(routes);
			} catch (err) {
				console.log(err);
			}
		});

    }

    private start() {

        this.server.start().then(() => {
            console.log(`Server started on host: ${this.server.info.host} and port: ${this.server.info.port}`);
        }).catch((err) => {
            console.log(`An error has occured while starting server. Error: ${err}`);
        })

    }

}