import * as Hapi from '@hapi/hapi';
import Joi from 'joi';

export const createPackageOptions: Hapi.RouteOptions = {
    auth: false,
    validate: {
        failAction: (request, h, err) => {
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

export const assignPackageToBagOptions: Hapi.RouteOptions = {
    auth: false,
    validate: {
        failAction: (request, h, err) => {
			throw err;
		},
        payload: Joi.object({
            bagBarcode: Joi.string().required()
        }).label('AssignPackageToBag Payload'),
        params: Joi.object({
            packageBarcode: Joi.string().required()
        }).label('AssignPackageToBag Params')
    },
    description: 'Assign Package to Bag with package barcode and bag barcode',
    notes: 'This method is used to assign a package with given barcode in url params to bag with given barcode body',
    tags: ['api']
}