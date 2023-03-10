import mongoose from "mongoose";
import { assignPackageToBag, canBeDelivered, isAssignedToBag, isDeliveryPointRight, loadPackage, setPackageStatus, unloadPackage } from "./_Package.methods";
import { createPackage } from "./_Package.statics";

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
PackageSchema.methods.assignPackageToBag = assignPackageToBag;
PackageSchema.methods.canBeDelivered = canBeDelivered;
PackageSchema.methods.isAssignedToBag = isAssignedToBag;
PackageSchema.methods.isDeliveryPointRight = isDeliveryPointRight;
PackageSchema.methods.loadPackage = loadPackage;
PackageSchema.methods.unloadPackage = unloadPackage;

export default PackageSchema;