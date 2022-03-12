import mongoose from "mongoose";
import { attemptToLoadShipments, createShipment, getShipment } from "./Shipment.statics";

const ShipmentSchema = new mongoose.Schema(
	{   
		shipmentBarcode: String,
        bag: {ref: 'Bag', type: mongoose.Types.ObjectId},
        package: {ref: 'Package', type: mongoose.Types.ObjectId}
	},
	{
		collection: 'Shipment',
	},
);

ShipmentSchema.statics.createShipment = createShipment;
ShipmentSchema.statics.getShipment = getShipment;
ShipmentSchema.statics.attemptToLoadShipments = attemptToLoadShipments;

export default ShipmentSchema;