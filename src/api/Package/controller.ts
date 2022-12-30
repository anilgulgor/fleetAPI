import * as Hapi from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import { ObjectResponse } from '../../shared/response';
import { PackageModel } from '../../models/_Package/_Package.model';
import * as ERRORS from '../../shared/errors.json';

export const createPackage: Hapi.Lifecycle.Method = async (request, h, err) => {

    interface CreatePackagePayload {
        barcode: String,
        deliveryPoint: Number,
        volumetricWeight: Number
    }

    const packagePayload: CreatePackagePayload = <CreatePackagePayload> request.payload;

    return PackageModel.createPackage(packagePayload).then((_package) => {

        return h.response(ObjectResponse(
            {
                userMessage: `The package with barcode: ${_package.barcode}, deliveryPoint: ${_package.destination.deliveryPoint} and volumetricWeight: ${_package.volumetricWeight} is created successfully`,
                developerMessage: `PACKAGE CREATED barcode: ${_package.barcode} deliveryPoint: ${_package.destination.deliveryPoint} volumetricWeight: ${_package.volumetricWeight}`
            }
        ))

    }).catch((err) => {

        if (err.code) {
            return h.response(err);
        } else {
            const _err: Boom.Boom = Boom.badRequest(
                err,
            );
            return err;
        }

    })

}

export const assignPackageToBag: Hapi.Lifecycle.Method = async (request, h, err) => {

    interface AssignPackageToBagPayload {
        bagBarcode: String
    }

    interface AssignPackageToBagParams {
        packageBarcode: String
    }

    const bagBarcodePayload: AssignPackageToBagPayload = <AssignPackageToBagPayload> request.payload;
    const packageBarcodeParams: AssignPackageToBagParams = <AssignPackageToBagParams> request.params;

    return PackageModel.findOne({barcode: packageBarcodeParams.packageBarcode})
    .populate({ path: 'destination', model: 'DeliveryPoint' })
    .populate({ path: 'bag', model: 'Bag' })
    .then((_package) => {

        if (_package) {

            return _package.assignPackageToBag(bagBarcodePayload).then((assignedPackage) => {

                return h.response(ObjectResponse(
                    {
                        userMessage: `The package with barcode: ${assignedPackage.barcode} is assigned to bag with barcode: ${assignedPackage.bag?.barcode}`,
                        developerMessage: `PACKAGE ASSIGNED barcode: ${assignedPackage.barcode} assigned to bag barcode: ${assignedPackage.bag?.barcode}`
                    }
                ))

            }).catch((err) => {

                if (err.code) {
                    return h.response(err);
                } else {
                    const _err: Boom.Boom = Boom.badRequest(
                        err,
                    );
                    return err;
                }

            })

        } else {
            return h.response(ObjectResponse({
                status: ERRORS.PACKAGE_ERRORS.PKG_2,
                userMessage: `Package barcode: ${packageBarcodeParams.packageBarcode} to assign with bag not found`,
                developerMessage: `${ERRORS.PACKAGE_ERRORS.PKG_2}: ${packageBarcodeParams.packageBarcode}`
            }));
        }

    }).catch((err) => {
       
        const _err: Boom.Boom = Boom.badRequest(
            err,
        );
        return err;
        
    })

}