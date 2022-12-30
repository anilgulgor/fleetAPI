import mongoose from "mongoose";

export interface IDeliveryPoint {
    deliveryPoint: String,
    value: Number
}

export interface IDeliveryPointDocument extends IDeliveryPoint, mongoose.Document {}
export interface IDeliveryPointModel extends mongoose.Model<IDeliveryPointDocument> {
    createDeliveryPoint({deliveryPoint , value}: {deliveryPoint: String, value: Number}): Promise<IDeliveryPointDocument>
}