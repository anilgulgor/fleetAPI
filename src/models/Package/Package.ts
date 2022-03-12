import mongoose from "mongoose";
import { IDeliveryPoint } from "../DeliveryPoint/DeliveryPoint";
import { IBag } from "../Bag/Bag";

interface PackageStatus {
    status: String,
    value: Number
}

export interface IPackage {
    barcode: String,
    volumetricWeight: Number,
    bagBarcode?: String,
    bag?: IBag,
    destination: IDeliveryPoint,
    deliveryPointForUnloading: Number,
    status: PackageStatus 
}

export interface IPackageDocument extends IPackage, mongoose.Document {
    setPackageStatus(this: IPackageDocument, {value}: {value: Number}): Promise<void>;
}
export interface IPackageModel extends mongoose.Model<IPackageDocument> {
    createPackage({barcode, deliveryPoint, volumetricWeight}: {barcode: String, deliveryPoint: Number, volumetricWeight: Number}): Promise<IPackageDocument>;
}