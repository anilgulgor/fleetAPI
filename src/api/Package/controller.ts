import * as Hapi from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import { ObjectResponse } from '../../shared/response';
import { PackageModel } from '../../models/Package/package.model';

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