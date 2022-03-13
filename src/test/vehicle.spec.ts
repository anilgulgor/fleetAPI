import chai, { assert, expect, should } from 'chai';
import { VehicleModel } from '../models/Vehicle/Vehicle.model';
import ERRORS from '../shared/errors.json';

describe('Create Vehicle', () => {
    
    it('It should create vehicle', () => {
        const _plate = '34 TL 34';

        VehicleModel.createVehicle({
            plate: _plate
        }).then((vehicle) => {
            expect(vehicle.plate).to.equal(_plate)
        })

    })

    it('Vehicle already registered', () => {
        const _plate = '34 TL 34';

        VehicleModel.createVehicle({
            plate: _plate
        }).catch((err) => {
            expect(err.status).to.equal(ERRORS.VEHICLE_ERRORS.VE_1)
        })

    })

})