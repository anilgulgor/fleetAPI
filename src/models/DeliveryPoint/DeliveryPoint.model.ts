import mongoose from "mongoose";
import { IDeliveryPoint, IDeliveryPointModel } from "./DeliveryPoint"; 
import DeliveryPointSchema from "./DeliveryPoint.schema";
  
export const DeliveryPointModel = mongoose.model<IDeliveryPoint, IDeliveryPointModel>("DeliveryPoint", DeliveryPointSchema);