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
    setBagStatus(this: IBagDocument, {value}: {value: Number}): Promise<void>;
    loadBag(this: IBagDocument): void;
    canBeDelivered(this: IBagDocument): boolean;
    unloadBagAndAssignedPackages(this: IBagDocument, deliveryPointValue: Number): void;
    isDeliveryPointRight(this: IBagDocument, deliveryPointValue: Number): boolean;
    checkIfCanBeUnloaded(this: IBagDocument): Promise<void>;
}
export interface IBagModel extends mongoose.Model<IBagDocument> {
    createBag({barcode, deliveryPoint}: {barcode: String, deliveryPoint: Number}): Promise<IBagDocument>;
}

