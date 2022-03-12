import mongoose from "mongoose";
import { createBag } from "./Bag.statics";
import { setBagStatus } from "./Bag.methods";

const BagSchema = new mongoose.Schema(
    {
        barcode: String,
        destination: {ref: 'DeliveryPoint', type: mongoose.Types.ObjectId },
        deliveryPointForUnloading: Number,
        status: Object
    }, 
    {
        collection: 'Bag'
    }
)

BagSchema.statics.createBag = createBag;
BagSchema.methods.setBagStatus = setBagStatus;

export default BagSchema;