import { IPackageDocument } from "./package";
import { PackageModel } from "./package.model";
import * as ERRORS from '../../shared/errors.json';
import { ObjectResponse } from "../../shared/response";
import { DeliveryPointModel } from "../DeliveryPoint/DeliveryPoint.model";
import { PACKAGE_STATUS } from "../../shared/status";

export async function createPackage({barcode, deliveryPoint, volumetricWeight}: {barcode: String, deliveryPoint: Number, volumetricWeight: Number}): Promise<IPackageDocument> {

    return new Promise((resolve, reject) => {

        return PackageModel.findOne({barcode: barcode})
        .populate({ path: 'deliveryPointForUnloading', model: 'DeliveryPoint' })
        .populate({ path: 'bag', model: 'Bag' })
        .then((_package) => {

            if (_package) {
                reject(ObjectResponse({
                    status: ERRORS.PACKAGE_ERRORS.PKG_1,
                    userMessage: `The Package with barcode: ${barcode} is already created in the system.`,
                    developerMessage: `${ERRORS.PACKAGE_ERRORS.PKG_1}: ${_package.barcode} deliveryPoint: ${_package.destination.deliveryPoint}`
                }));
                return;
            } else {

                DeliveryPointModel.findOne({value: deliveryPoint}).then((_deliveryPoint) => {
                    if (_deliveryPoint) {

                        PackageModel.create({
                            barcode: barcode,
                            volumetricWeight: volumetricWeight,
                            destination: _deliveryPoint,
                            deliveryPointForUnloading: _deliveryPoint.value
                        }).then((newPackage) => {
                            newPackage.setPackageStatus({value: PACKAGE_STATUS.Created});
                            resolve(newPackage);
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

        })
        .catch((err) => {
            reject(err);
            return;
        })

    })

}