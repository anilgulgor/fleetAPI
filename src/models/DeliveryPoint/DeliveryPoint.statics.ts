import { IDeliveryPointDocument, IDeliveryPointModel } from "./DeliveryPoint";
import { DeliveryPointModel } from "./DeliveryPoint.model";
import * as ERRORS from '../../shared/errors.json';
import { ObjectResponse } from "../../shared/response";

export async function createDeliveryPoint({ deliveryPoint, value }: { deliveryPoint: String, value: Number }): Promise<IDeliveryPointDocument> {

    return new Promise<IDeliveryPointDocument>((resolve, reject) => {

        return DeliveryPointModel.findOne({ value: value }).then((_deliveryPoint) => {

            if (_deliveryPoint) {
                reject(ObjectResponse({
                    status: ERRORS.DELIVERY_POINT_ERRORS.DP_1,
                    userMessage: `The delivery point with value: ${value} is already created in the system.`,
                    developerMessage: `${ERRORS.DELIVERY_POINT_ERRORS.DP_1}: ${_deliveryPoint.deliveryPoint} value: ${_deliveryPoint.value}`
                }));
                return;
            } else {
                DeliveryPointModel.create({
                    deliveryPoint: deliveryPoint,
                    value: value
                }).then((newDeliveryPoint) => {
                    resolve(newDeliveryPoint);
                }).catch((err) => {
                    reject(err);
                    return;
                })
            }

        }).catch((err) => {
            reject(err);
            return;
        })

    })

}