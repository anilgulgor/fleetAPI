import mongoose from "mongoose";
import { IVehicle, IVehicleModel } from "./Vehicle"; 
import VehicleSchema from "./Vehicle.schema";
  
export const VehicleModel = mongoose.model<IVehicle, IVehicleModel>("Vehicle", VehicleSchema);