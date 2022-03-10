import * as Hapi from '@hapi/hapi';
import Joi from 'joi';

const TURKISH_PLATE_PATTERN = /^(0[1-9]|[1-7][0-9]|8[01])(([A-Z])(\d{4,5})|([A-Z]{2})(\d{3,4})|([A-Z]{3})(\d{2,3}))$/

export const createVehicleOptions: Hapi.RouteOptions = {
    auth: false,
    validate: {
        failAction: (request, h, err) => {
            console.log(err);
			throw err;
		},
        payload: Joi.object({
            plate: Joi.string().required().regex(TURKISH_PLATE_PATTERN).error(new Error('Plate must be Turkish Plate Format e.g [12-ABC-345]'))
        }).label('CreateVehiclePayload')
    },
    description: 'Create Vehicle with TR Plate',
    notes: 'This method creates a single vehicle with given plate. Plate must be in TR Plate format.',
    tags: ['api']
}