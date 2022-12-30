import mongoose from "mongoose";
import { IPackage, IPackageModel } from "./_Package";
import PackageSchema from "./_Package.schema";

export const PackageModel = mongoose.model<IPackage, IPackageModel>("Package", PackageSchema);