import mongoose from "mongoose";
import { IDeliveryPoint } from "../DeliveryPoint/DeliveryPoint";

interface BagStatus {
    status: String,
    value: Number
}

export interface IBag {
    barcode: String,
    destination: IDeliveryPoint,
    deliveryPointForUnloading: Number,
    status: BagStatus
}

export interface IBagDocument extends IBag, mongoose.Document {
    setStatus(this: IBagDocument, {value}: {value: Number}): Promise<void>;
}
export interface IBagModel extends mongoose.Model<IBagDocument> {
    createBag({barcode, deliveryPoint}: {barcode: String, deliveryPoint: Number}): Promise<IBagDocument>;
}
