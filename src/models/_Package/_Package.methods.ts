import mongoose from "mongoose";
import { IPackageDocument } from "./_Package";
import { PACKAGE_STATUS } from "../../shared/status";
import { BagModel } from "../Bag/Bag.model";
import * as ERRORS from "../../shared/errors.json"
import { ObjectResponse } from "../../shared/response";

export async function setPackageStatus(this: IPackageDocument, {value}: {value: Number}) {

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

export async function assignPackageToBag(this: IPackageDocument, {bagBarcode}: {bagBarcode: String}): Promise<IPackageDocument> {

    return new Promise<IPackageDocument>((resolve, reject) => {

        return BagModel.findOne({barcode: bagBarcode})
        .populate({ path: 'destination', model: 'DeliveryPoint' })
        .then((bag) => {

            if (bag) {
                
                this.bag = bag;
                this.bagBarcode = bag.barcode
                this.destination = bag.destination;
                this.deliveryPointForUnloading = bag.deliveryPointForUnloading;

                return this.save().then((_package) => {
                    console.log(_package);
                    resolve(_package);
                    return;
                }).catch((err) => {
                    reject(err);
                    return;
                })

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