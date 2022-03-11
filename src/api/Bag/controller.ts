import * as Hapi from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import { BagModel } from '../../models/Bag/Bag.model';
import { ObjectResponse } from '../../shared/response';

export const createBag: Hapi.Lifecycle.Method = async (request, h, err) => {

    interface CreateBagPayload {
        barcode: String,
        deliveryPoint: Number
    }

    const bagPayload: CreateBagPayload = <CreateBagPayload> request.payload;

    return BagModel.createBag(bagPayload).then((bag) => {
        return h.response(ObjectResponse(
            {
                userMessage: `The bag with barcode: ${bag.barcode} and deliveryPoint: ${bag.destination.deliveryPoint} is created successfully`,
                developerMessage: `BAG CREATED barcode: ${bag.barcode} deliveryPoint: ${bag.destination.deliveryPoint}`
            }
        ))
    }).catch((err) => {
        
        if (err.code) {
            return h.response(err);
        } else {
            const _err: Boom.Boom = Boom.badRequest(
                err,
            );
            return err;
        }

    })

} 