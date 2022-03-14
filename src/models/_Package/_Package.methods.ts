import mongoose from "mongoose";
import { IPackageDocument } from "./_Package";
import { PACKAGE_STATUS } from "../../shared/status";
import { BagModel } from "../Bag/Bag.model";
import * as ERRORS from "../../shared/errors.json"
import { ObjectResponse } from "../../shared/response";
import { IncorrectlySentShipmentModel } from "../IncorrectlySentShipment/IncorrectlySentShipment.model";

export async function setPackageStatus(this: IPackageDocument, { value }: { value: Number }) {

    switch (value) {
        case PACKAGE_STATUS.Created:
            this.status = {
                status: 'Created',
                value: value
            }
            break;
        case PACKAGE_STATUS.LoadedIntoBag:
            this.status = {
                status: 'Loaded Into Bag',
                value: value
            }
            break;
        case PACKAGE_STATUS.Loaded:
            this.status = {
                status: 'Loaded',
                value: value
            }
            break;
        case PACKAGE_STATUS.Unloaded:
            this.status = {
                status: 'Unloaded',
                value: value
            }
        default:
            break;
    }

    await this.save();

}

export async function assignPackageToBag(this: IPackageDocument, { bagBarcode }: { bagBarcode: String }): Promise<IPackageDocument> {

    return new Promise<IPackageDocument>((resolve, reject) => {

        return BagModel.findOne({ barcode: bagBarcode })
            .populate({ path: 'destination', model: 'DeliveryPoint' })
            .then((bag) => {

                if (bag) {

                    if (this.destination.value == bag.destination.value) {

                        this.bag = bag;
                        this.bagBarcode = bag.barcode
                        this.destination = bag.destination;
                        this.deliveryPointForUnloading = bag.deliveryPointForUnloading;

                        return this.save().then((_package) => {
                            resolve(_package);
                            return;
                        }).catch((err) => {
                            reject(err);
                            return;
                        })

                    } else {
                        reject(ObjectResponse({
                            status: ERRORS.BAG_ERRORS.BAG_3,
                            userMessage: `Bag: ${bag.barcode} destination is not compatible with package: ${this.barcode} destination`,
                            developerMessage: `${ERRORS.BAG_ERRORS.BAG_3}: bag: ${bag.barcode} package: ${this.barcode}`
                        }));
                        return;
                    }

                } else {
                    reject(ObjectResponse({
                        status: ERRORS.BAG_ERRORS.BAG_2,
                        userMessage: `Bag barcode: ${bagBarcode} for assigning with package not found`,
                        developerMessage: `${ERRORS.BAG_ERRORS.BAG_2}: ${bagBarcode}`
                    }));
                    return;
                }

            }).catch((err) => {
                reject(err);
                return;
            })

    })

}

export async function isAssignedToBag(this: IPackageDocument): Promise<boolean> {

    return new Promise((resolve, reject) => {

        if (this.bag) {
            // Assigned to bag
            resolve(true);
            return;
        } else {
            // Not assigned to any bag
            resolve(false);
            return;
        }

    })

}


export function canBeDelivered(this: IPackageDocument) : boolean {

    if (this.bag) {
        switch (this.destination.value) {
            case 1:
                return false;
            default:
                return true;
        }
    } else {
        switch (this.destination.value) {
            case 1:
            case 2:
                return true;
            default:
                return false;
        }
    }

}

export async function loadPackage(this: IPackageDocument) {

    const isAssignedToBag: boolean = await this.isAssignedToBag();

    if (!isAssignedToBag) {
        // is not assigned to bag. Set status loaded
        this.setPackageStatus({ value: PACKAGE_STATUS.Loaded });
    } else {
        // is assigned to bag. Set status loaded into bag
        this.setPackageStatus({ value: PACKAGE_STATUS.LoadedIntoBag });
    }

}

export function isDeliveryPointRight(this: IPackageDocument, deliveryPointValue: Number): boolean {

    if (this.destination.value == deliveryPointValue) {
        
        if (this.canBeDelivered()) {
            return true;
        } else {
            IncorrectlySentShipmentModel.createIncorrectlySentShipmentLog({
                barcode: this.barcode,
                deliveryPoint: deliveryPointValue
            })
            return false;
        }
        
    } else {
        IncorrectlySentShipmentModel.createIncorrectlySentShipmentLog({
            barcode: this.barcode,
            deliveryPoint: deliveryPointValue
        })
        return false;
    }

}

export async function unloadPackage(this: IPackageDocument, deliveryPointValue: Number) {

    // set package status to unloaded if delivery point is right
    if (this.isDeliveryPointRight(deliveryPointValue)) {
        // delivery point is right. set package status to unloaded
        this.setPackageStatus({ value: PACKAGE_STATUS.Unloaded });
        BagModel.findOne({barcode: this.bagBarcode}).then((bag) => {
            bag?.checkIfCanBeUnloaded();
        })
    }

}