import { IPackageDocument } from "./_Package";
import { PackageModel } from "./_Package.model";
import * as ERRORS from '../../shared/errors.json';
import { ObjectResponse } from "../../shared/response";
import { DeliveryPointModel } from "../DeliveryPoint/DeliveryPoint.model";
import { PACKAGE_STATUS } from "../../shared/status";
import { ShipmentModel } from "../Shipment/Shipment.model";

export async function createPackage({barcode, deliveryPoint, volumetricWeight}: {barcode: String, deliveryPoint: Number, volumetricWeight: Number}): Promise<IPackageDocument> {

    return new Promise<IPackageDocument>((resolve, reject) => {

        return PackageModel.findOne({barcode: barcode})
        .populate({ path: 'destination', model: 'DeliveryPoint' })
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
                            ShipmentModel.createShipment({shipmentBarcode: newPackage.barcode, _package: newPackage});
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