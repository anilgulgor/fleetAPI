import mongoose from "mongoose";
import { IBagModel, IBag } from "./Bag";
import BagSchema from "./Bag.schema";

export const BagModel = mongoose.model<IBag, IBagModel>('Bag', BagSchema);