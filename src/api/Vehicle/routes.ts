import * as Hapi from '@hapi/hapi';
import * as RouteOptions from './routeOptions';
import * as Controller from './controller';

export const Routes: Array<Hapi.ServerRoute> = [
    {
		path: '/vehicle/create',
		method: 'POST',
		options: RouteOptions.createVehicleOptions,
		handler: Controller.createVehicle,
	},
]

