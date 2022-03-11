import * as Hapi from '@hapi/hapi';
import Joi from 'joi';

export const createBagOptions: Hapi.RouteOptions = {
    auth: false,
    validate: {
        failAction: (request, h, err) => {
            console.log(err);
			throw err;
		},
        payload: Joi.object({
            barcode: Joi.string().required(),
            deliveryPoint: Joi.number().integer().min(1).max(3).required()
        }).label('CreateBagPayload')
    },
    description: 'Create Bag with barcode and delivery point',
    notes: 'This method creates a single bag with barcode and delivery point with given delivery point value',
    tags: ['api']
}