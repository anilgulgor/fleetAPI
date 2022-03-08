import * as Hapi from '@hapi/hapi';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';

export const ServerPlugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
	{
		plugin: Inert,
	},
	{
		plugin: Vision,
	},
	{
		plugin: HapiSwagger,
		options: {
			info: {
				title: 'Fleet Management System API Documentation',
				version: '1.0',
			},
			schemes: ['https'],
			basePath: '/',
			documentationPath: '/',
		},
	},
];
