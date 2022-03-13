import mongoose from "mongoose";
import { IBagDocument } from "./Bag";
import { BAG_STATUS, PACKAGE_STATUS } from "../../shared/status";
import { PackageModel } from "../_Package/_Package.model";

export async function setBagStatus(this: IBagDocument, { value }: { value: Number }): Promise<void> {

    switch (value) {
        case BAG_STATUS.Created:
            this.status = {
                status: 'Created',
                value: value
            }
            break;
        case BAG_STATUS.Loaded:
            this.status = {
                status: 'Loaded',
                value: value
            }
            break;
        case BAG_STATUS.Unloaded:
            this.status = {
                status: 'Unloaded',
                value: value
            }
        default:
            break;
    }

    await this.save();

}

export async function loadBag(this: IBagDocument) {

    // set bag status to loaded
    this.setBagStatus({ value: BAG_STATUS.Loaded });

}

export function canBeDelivered(this: IBagDocument) : boolean {

    switch (this.destination.value) {
        case 1:
            return false;
        case 2:
            return true;
        case 3:
            return true;
        default:
            return false;
    }

}

export function isDeliveryPointRight(this: IBagDocument, deliveryPointValue: Number): boolean {

    if (this.destination.value == deliveryPointValue) {
        if (this.canBeDelivered()) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }

}

export async function unloadBagAndAssignedPackages(this: IBagDocument, deliveryPointValue: Number) {

    // set bag status to unloaded if delivery point is right
    if (this.isDeliveryPointRight(deliveryPointValue)) {
        // delivery point is right. set bag status unloaded
        await this.setBagStatus({ value: BAG_STATUS.Unloaded });

        // set packages status that assigned to this bag to unloaded
        PackageModel.find({ bag: this }).then((_packages) => {
            for (const _package of _packages) {
                _package.unloadPackage(_package.destination.value);
            }
        })

    }

}

export async function checkIfCanBeUnloaded(this: IBagDocument): Promise<void> {

    return new Promise<void>((resolve, reject) => {

        return PackageModel.find({bag: this}).then((packages) => {

            if (packages.length > 0) {

                let canBeUnloaded = true;

                for (const _package of packages) {
                    
                    if (_package.status.value != PACKAGE_STATUS.Unloaded) {
                        canBeUnloaded = false;
                    }

                }

                if (canBeUnloaded == true) { 

                    this.setBagStatus({value: BAG_STATUS.Unloaded}).then(() => {
                        resolve();
                    });

                } else {

                    resolve();

                }

            } else {

                resolve();

            }

        }).catch((err) => {

            reject(err);

        })

    })

}