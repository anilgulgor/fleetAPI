import mongoose from "mongoose";
import { IIncorrectlySentShipment, IIncorrectlySentShipmentModel } from "./IncorrectlySentShipment"; 
import IncorrectlySentShipmentSchema from "./IncorrectlySentShipment.schema";
  
export const IncorrectlySentShipmentModel = mongoose.model<IIncorrectlySentShipment, IIncorrectlySentShipmentModel>("IncorrectlySentShipment", IncorrectlySentShipmentSchema);