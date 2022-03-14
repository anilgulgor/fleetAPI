import * as Hapi from '@hapi/hapi';
import Joi from 'joi';

const barcodeArray = Joi.object().keys({
    barcode: Joi.string().required()
})

const routeArray = Joi.object().keys({
	deliveryPoint: Joi.number().required(),
	deliveries: Joi.array().items(barcodeArray).required()
});

export const attemptToDeliverOptions: Hapi.RouteOptions = {
    auth: false,
    validate: {
        failAction: (request, h, err) => {
			throw err;
		},
        payload: Joi.object({
            plate: Joi.string().required(),
            route: Joi.array().items(routeArray).required()
        }).label('AttemptToDeliverPayload')
    },
    description: 'Attempt to deliver with payload that includes vehicle plate and routes which include shipment barcodes and deliveryPoints',
    notes: 'This method creates process of delivery with given vehicle plate and routes array',
    tags: ['api']
}