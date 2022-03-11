import * as Hapi from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import { DeliveryPointModel } from '../../models/DeliveryPoint/DeliveryPoint.model';
import { ObjectResponse } from '../../shared/response';

export const createDeliveryPoint: Hapi.Lifecycle.Method = async (request, h, err) => {

    interface CreateDeliveryPointPayload {
        deliveryPoint: String,
        value: Number
    }

    const deliveryPointPayload: CreateDeliveryPointPayload = <CreateDeliveryPointPayload>request.payload;

    return DeliveryPointModel.createDeliveryPoint(deliveryPointPayload)
        .then((newDeliveryPoint) => {
            return h.response(ObjectResponse(
                {
                    userMessage: `The delivery point with name: ${deliveryPointPayload.deliveryPoint} and value: ${deliveryPointPayload.value} is created successfully`,
                    developerMessage: `DELIVERY POINT CREATED: ${deliveryPointPayload}`
                }));
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
