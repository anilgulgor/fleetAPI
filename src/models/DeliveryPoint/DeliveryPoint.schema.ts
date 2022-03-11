import mongoose from "mongoose";
import { IDeliveryPoint, IDeliveryPointModel } from "./DeliveryPoint";
import { createDeliveryPoint } from "./DeliveryPoint.statics";

const DeliveryPointSchema = new mongoose.Schema(
	{   
		deliveryPoint: String,
        value: Number
	},
	{
		collection: 'DeliveryPoint',
	},
);

DeliveryPointSchema.statics.createDeliveryPoint = createDeliveryPoint;

export default DeliveryPointSchema;