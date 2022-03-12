import * as Hapi from '@hapi/hapi';
import Joi from 'joi';

export const createPackageOptions: Hapi.RouteOptions = {
    auth: false,
    validate: {
        failAction: (request, h, err) => {
            console.log(err);
			throw err;
		},
        payload: Joi.object({
            barcode: Joi.string().required(),
            deliveryPoint: Joi.number().integer().min(1).max(3).required(),
            volumetricWeight: Joi.number().integer().min(1).required()
        }).label('CreatePackagePayload')
    },
    description: 'Create Package with barcode, delivery point and volumetric weight',
    notes: 'This method creates a single package with barcode, volumetric weight and delivery point with given delivery point value',
    tags: ['api']
}