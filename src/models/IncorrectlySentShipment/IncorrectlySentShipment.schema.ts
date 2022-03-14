import mongoose from "mongoose";
import { createIncorrectlySentShipmentLog } from "./IncorrectlySentShipment.statics";

const IncorrectlySentShipmentSchema = new mongoose.Schema(
	{   
		barcode: String,
        deliveryPoint: Number
	},
	{
		collection: 'IncorrectlySentShipment',
	},
);

IncorrectlySentShipmentSchema.statics.createIncorrectlySentShipmentLog = createIncorrectlySentShipmentLog;

export default IncorrectlySentShipmentSchema;