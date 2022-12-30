import * as Hapi from '@hapi/hapi';
import Joi from 'joi';

export const createDeliveryPointOptions: Hapi.RouteOptions = {
    auth: false,
    validate: {
        failAction: (request, h, err) => {
			throw err;
		},
        payload: Joi.object({
            deliveryPoint: Joi.string().required(),
            value: Joi.number().integer().min(1).max(3).required()
        }).label('CreateDeliveryPointPayload')
    },
    description: 'Create Delivery Point with delivery point name and delivery point value',
    notes: 'This method creates a single delivery point with delivery point name and value',
    tags: ['api']
}