import mongoose from "mongoose";
import { IBag, IBagDocument } from "../Bag/Bag";
import { IPackage, IPackageDocument } from "../_Package/_Package";

export interface IShipment {
    shipmentBarcode: String,
    package: IPackageDocument,
    bag: IBagDocument
}

export interface AttemptToDeliverPayload {
    plate: String,
    route: [RoutePayload]
}

export interface RoutePayload {
    deliveryPoint: Number,
    deliveries: [DeliveryPayload]
}

export interface DeliveryPayload {
    barcode: String
}

export interface IShipmentDocument extends IShipment, mongoose.Document { }
export interface IShipmentModel extends mongoose.Model<IShipmentDocument> {
    createShipment({ shipmentBarcode, bag, _package }: { shipmentBarcode: String, bag?: IBagDocument, _package?: IPackageDocument }): Promise<IShipmentDocument>;
    getShipment({ shipmentBarcode }: {shipmentBarcode: String}): Promise<IShipmentDocument | null>;
    attemptToLoadShipments({routes}: {routes: [RoutePayload]}): Promise<void>;
}