import mongoose from "mongoose";
import { IShipment, IShipmentModel } from "./Shipment"; 
import ShipmentSchema from "./Shipment.schema";
  
export const ShipmentModel = mongoose.model<IShipment, IShipmentModel>("Shipment", ShipmentSchema);