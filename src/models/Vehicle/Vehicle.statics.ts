import { IVehicleDocument, IVehicleModel } from "./Vehicle";
import { VehicleModel } from "./Vehicle.model";
import * as ERRORS from '../../shared/errors.json';
import { ObjectResponse } from "../../shared/response";

export async function createVehicle({ plate }: { plate: String }): Promise<IVehicleDocument> {

    return new Promise<IVehicleDocument>((resolve, reject) => {

        return isVehicleAvailable({plate}).then((vehicle) => {

            if (vehicle) {
                reject(ObjectResponse({
                    status: ERRORS.VEHICLE_ERRORS.VE_1,
                    userMessage: `The Vehicle with plate: ${plate} is already registered in the system.`,
                    developerMessage: `${ERRORS.VEHICLE_ERRORS.VE_1}: ${plate}`
                }));
                return;
            } else {
                VehicleModel.create({
                    plate: plate
                }).then((newVehicle) => {
                    resolve(newVehicle);
                }).catch((err) => {
                    reject(err);
                    return;
                })
            }

        }).catch((err) => {
            reject(err);
            return;
        })

    })

}

export async function isVehicleAvailable({ plate }: { plate: String }): Promise<IVehicleDocument | null> {

    return new Promise<IVehicleDocument | null>((resolve, reject) => {

        return VehicleModel.findOne({ plate: plate }).then((vehicle) => {

            if(vehicle) {
                resolve(vehicle);
                return;
            } else {
                resolve(null);
                return;
            }

        }).catch((err) => {
            reject(err);
            return;
        })

    })

}