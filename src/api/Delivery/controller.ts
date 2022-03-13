import * as Hapi from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import { ObjectResponse } from '../../shared/response';
import { isVehicleAvailable } from '../../models/Vehicle/Vehicle.statics';
import * as ERRORS from '../../shared/errors.json';
import { ShipmentModel } from '../../models/Shipment/Shipment.model';
import { IPackageDocument } from '../../models/_Package/_Package'
import { IBagDocument } from '../../models/Bag/Bag';
import * as async from 'async';
import { AttemptToDeliverPayload, RoutePayload } from '../../models/Shipment/Shipment';



export const attemptToDeliver: Hapi.Lifecycle.Method = async (request, h, err) => {

    const shipment: AttemptToDeliverPayload = <AttemptToDeliverPayload>request.payload;
    const plate: String = shipment.plate;
    const routes: [RoutePayload] = shipment.route;

    return isVehicleAvailable({ plate: plate }).then((vehicle) => {

        if (vehicle) {

            // Step 1.
            // Set all shipments (packages and bags) status to loaded

            return ShipmentModel.attemptToLoadShipments({routes: routes}).then(() => {

                // Step 2
                // Attempt to unload shipments for this vehicle

                return ShipmentModel.attemptToUnloadShipments({routes: routes}).then((distributedShipments) => {

                    return h.response({plate: plate,route: distributedShipments});

                }).catch((err) => {

                    const _err: Boom.Boom = Boom.badRequest(
                        err,
                    );
                    return err;

                })

            }).catch((err) => {

                const _err: Boom.Boom = Boom.badRequest(
                    err,
                );
                return err;

            })
            

        } else {
            return h.response(ObjectResponse({
                userMessage: `The Vehicle with plate: ${shipment.plate} is not available/not found`,
                developerMessage: `${ERRORS.VEHICLE_ERRORS.VE_2}: ${shipment.plate}`
            }));
        }

    }).catch((err) => {

        const _err: Boom.Boom = Boom.badRequest(
            err,
        );
        return err;

    })

}