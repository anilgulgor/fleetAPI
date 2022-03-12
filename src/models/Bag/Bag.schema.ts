import mongoose from "mongoose";
import { createBag } from "./Bag.statics";
import { checkIfCanBeUnloaded, loadBag, setBagStatus, unloadBagAndAssignedPackages } from "./Bag.methods";

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
BagSchema.methods.unloadBagAndAssignedPackages = unloadBagAndAssignedPackages;
BagSchema.methods.checkIfCanBeUnloaded = checkIfCanBeUnloaded;

export default BagSchema;