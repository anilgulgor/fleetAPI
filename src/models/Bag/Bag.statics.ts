import { IBagDocument, IBagModel } from "./Bag";
import { BagModel } from "./Bag.model";
import { DeliveryPointModel } from "../DeliveryPoint/DeliveryPoint.model";
import * as ERRORS from '../../shared/errors.json';
import { BAG_STATUS } from "../../shared/status";
import { ObjectResponse } from "../../shared/response";

export async function createBag({ barcode, deliveryPoint }: { barcode: String, deliveryPoint: Number }): Promise<IBagDocument> {

    return new Promise<IBagDocument>((resolve, reject) => {

        return BagModel.findOne({ barcode: barcode })
            .populate({ path: 'deliveryPointForUnloading', model: 'DeliveryPoint' })
            .then((bag) => {

                if (bag) {
                    reject(ObjectResponse({
                        status: ERRORS.DELIVERY_POINT_ERRORS.DP_1,
                        userMessage: `The Bag with barcode: ${barcode} is already created in the system.`,
                        developerMessage: `${ERRORS.BAG_ERRORS.BAG_1}: ${bag.barcode} deliveryPoint: ${bag.destination.deliveryPoint}`
                    }));
                    return;
                } else {

                    DeliveryPointModel.findOne({value: deliveryPoint}).then((_deliveryPoint) => {
                        if (_deliveryPoint) {

                            BagModel.create({
                                barcode: barcode,
                                destination: _deliveryPoint,
                                deliveryPointForUnloading: _deliveryPoint.value
                            }).then((newBag) => {
                                newBag.setStatus({value: BAG_STATUS.Created});
                                resolve(newBag);
                            }).catch((err) => {
                                reject(err);
                                return;
                            })

                        } else {

                            reject(ObjectResponse({
                                status: ERRORS.DELIVERY_POINT_ERRORS.DP_2,
                                userMessage: `Destination value: ${deliveryPoint} for unloading bag not found`,
                                developerMessage: `${ERRORS.DELIVERY_POINT_ERRORS.DP_2}: ${deliveryPoint}`
                            }));
                            return;

                        }
                    })

                }

            }).catch((err) => {
                reject(err);
                return;
            })

    })

}