import { IVehicleDocument, IVehicleModel } from "./Vehicle";
import { VehicleModel } from "./Vehicle.model";

export async function createVehicle({ plate }: { plate: String }): Promise<IVehicleDocument> {

    return new Promise<IVehicleDocument>((resolve, reject) => {
        
        return VehicleModel.findOne({plate: plate}).then((vehicle) => {

            if (vehicle) {
                resolve(vehicle);
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