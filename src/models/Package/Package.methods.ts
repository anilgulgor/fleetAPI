import mongoose from "mongoose";
import { IPackageDocument } from "./package";
import { PACKAGE_STATUS } from "../../shared/status";

export async function setPackageStatus(this: IPackageDocument, {value}: {value: Number}): Promise<void> {

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