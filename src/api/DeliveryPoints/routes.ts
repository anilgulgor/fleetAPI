import * as Hapi from '@hapi/hapi';
import * as RouteOptions from './routeOptions';
import * as Controller from './controller';

export const Routes: Array<Hapi.ServerRoute> = [
    {
		path: '/deliveryPoint/create',
		method: 'POST',
		options: RouteOptions.createDeliveryPointOptions,
		handler: Controller.createDeliveryPoint,
	},
]

