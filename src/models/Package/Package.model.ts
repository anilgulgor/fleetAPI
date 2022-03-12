import mongoose from "mongoose";
import { IPackage, IPackageModel } from "./package";
import PackageSchema from "./package.Schema";

export const PackageModel = mongoose.model<IPackage, IPackageModel>("Package", PackageSchema);