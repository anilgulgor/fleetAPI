import * as Hapi from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import { VehicleModel } from '../../models/Vehicle/Vehicle.model';
import { ObjectResponse } from '../../shared/response';

export const createVehicle: Hapi.Lifecycle.Method = async (request, h, err) => {

    interface CreateVehiclePayload {
        plate: String
    }

    const createVehiclePayload: CreateVehiclePayload = <CreateVehiclePayload> request.payload;
    const vehiclePlate: String = createVehiclePayload.plate.toUpperCase();

    return VehicleModel.createVehicle({
        plate: vehiclePlate
    }).then((newVehicle) => {
        
        return h.response(ObjectResponse({userMessage:`The vehicle with plate: ${vehiclePlate} is reqistered successfully`, developerMessage: `VEHICLE CREATED: ${vehiclePlate}`}));

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