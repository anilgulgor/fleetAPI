import mongoose from "mongoose";
import { IBagDocument } from "./Bag";
import { BAG_STATUS } from "../../shared/status";

export async function setStatus(this: IBagDocument, {value}: {value: Number}): Promise<void> {

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