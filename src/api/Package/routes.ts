import * as Hapi from '@hapi/hapi';
import * as RouteOptions from './routeOptions';
import * as Controller from './controller';

export const Routes: Array<Hapi.ServerRoute> = [
    {
		path: '/package/create',
		method: 'POST',
		options: RouteOptions.createPackageOptions,
		handler: Controller.createPackage,
	},
    {
        path: '/package/{packageBarcode}/assignToBag',
        method: 'PUT',
        options: RouteOptions.assignPackageToBagOptions,
        handler: Controller.assignPackageToBag
    }
]

