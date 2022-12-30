import mongoose from "mongoose";
import { createBag } from "./Bag.statics";
import { canBeDelivered, checkIfCanBeUnloaded, isDeliveryPointRight, loadBag, setBagStatus, unloadBagAndAssignedPackages } from "./Bag.methods";

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
BagSchema.methods.loadBag = loadBag;
BagSchema.methods.canBeDelivered = canBeDelivered;
BagSchema.methods.unloadBagAndAssignedPackages = unloadBagAndAssignedPackages;
BagSchema.methods.isDeliveryPointRight = isDeliveryPointRight;
BagSchema.methods.checkIfCanBeUnloaded = checkIfCanBeUnloaded;

export default BagSchema;