import mongoose from "mongoose";
import { createBag } from "./Bag.statics";
import { setStatus } from "./Bag.methods";

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
BagSchema.methods.setStatus = setStatus;

export default BagSchema;