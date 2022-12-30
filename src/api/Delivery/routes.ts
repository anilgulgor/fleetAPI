import * as Hapi from '@hapi/hapi';
import * as RouteOptions from './routeOptions';
import * as Controller from './controller';

export const Routes: Array<Hapi.ServerRoute> = [
    {
		path: '/delivery/attemptToDeliver',
		method: 'POST',
		options: RouteOptions.attemptToDeliverOptions,
		handler: Controller.attemptToDeliver,
	},
]

