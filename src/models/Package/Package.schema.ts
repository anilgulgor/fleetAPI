import mongoose from "mongoose";
import { setPackageStatus } from "./Package.methods";
import { createPackage } from "./Package.statics";

const PackageSchema = new mongoose.Schema(
    {
        barcode: String,
        volumetricWeight: Number,
        bagBarcode: String,
        bag: {ref: 'Bag', type: mongoose.Types.ObjectId },
        destination: {ref: 'DeliveryPoint', type: mongoose.Types.ObjectId },
        deliveryPointForUnloading: Number,
        status: Object
    },
    {
        collection: "Package"
    }
)

PackageSchema.statics.createPackage = createPackage;
PackageSchema.methods.setPackageStatus = setPackageStatus;

export default PackageSchema;