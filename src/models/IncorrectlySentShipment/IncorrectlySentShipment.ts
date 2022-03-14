import mongoose from "mongoose";

export interface IIncorrectlySentShipment {
    barcode: String,
    deliveryPoint: Number
}

export interface IIncorrectlySentShipmentDocument extends IIncorrectlySentShipment, mongoose.Document { }
export interface IIncorrectlySentShipmentModel extends mongoose.Model<IIncorrectlySentShipmentDocument> {
	createIncorrectlySentShipmentLog({barcode, deliveryPoint}: {barcode: String, deliveryPoint: Number}): Promise<IIncorrectlySentShipmentDocument>;
}