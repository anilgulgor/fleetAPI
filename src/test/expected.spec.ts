import { select } from 'async';
import chai, { expect } from 'chai';
import chaiHttp = require('chai-http');
import { BagModel } from '../models/Bag/Bag.model';
import { IncorrectlySentShipmentModel } from '../models/IncorrectlySentShipment/IncorrectlySentShipment.model';
import { ShipmentModel } from '../models/Shipment/Shipment.model';
import { VehicleModel } from '../models/Vehicle/Vehicle.model';
import { PackageModel } from '../models/_Package/_Package.model';
import { BAG_STATUS, PACKAGE_STATUS } from '../shared/status';

chai.use(chaiHttp);
const should = chai.should();

describe('**** EXPECTED TEST RESULTS ****', () => {
    
    // Successful attempts

    it('Show the status of loaded and unloaded shipments on the database.', done => {
        
        PackageModel.find({status: {$in: [{status: 'Loaded', value: PACKAGE_STATUS.Loaded}, {status: 'Unloaded', value: PACKAGE_STATUS.Unloaded}]}}, '-_id barcode status').then((_packages) => {

            BagModel.find({status: {$in: [{status: 'Loaded', value: BAG_STATUS.Loaded}, {status: 'Unloaded', value: BAG_STATUS.Unloaded}]}}, '-_id barcode status').then((_bags) => {

                const shipments: any[] = [..._packages.map((p) => p.toObject()), ..._bags.map((b) => b.toObject())];

                console.table(shipments);

                done();

            })

        })

    })

    it('Show the status of the shipment with the barcode number P8988000120 to remain “created”.', done => {

        PackageModel.findOne({barcode: 'P8988000120'}, '-_id barcode status').then((_package) => {

            console.table([_package?.toObject()]);

            done();

        })

    })

    it('Show logs for barcode numbers P8988000121 and C725799 (due to attempt to deliver to the wrong point)', done => {

        IncorrectlySentShipmentModel.find({barcode: {$in: ['P8988000121', 'C725799']}}, '-_id barcode deliveryPoint').then((shipments) => {

            console.table([...shipments.map((s) => s.toObject())]);

            done();

        })

    })

    it('Show the status of the shipment with the barcode number P8988000121 to remain “loaded”', done => {

        PackageModel.findOne({barcode: 'P8988000121'}, '-_id barcode status').then((_package) => {

            console.table([_package?.toObject()]);

            done();

        })

    })

    it('the status of the bag with the barcode number C725800 to be “unloaded”.', done => {

        BagModel.findOne({barcode: 'C725800'}, '-_id barcode status').then((_bag) => {

            console.table([_bag?.toObject()]);

            done();

        })

    })

    it('Show the status of the shipment with the barcode number P8988000122 to remain “Unloaded”', done => {

        PackageModel.findOne({barcode: 'P8988000122'}, '-_id barcode status').then((_package) => {

            console.table([_package?.toObject()]);

            done();

        })

    })

    it('Show the status of the shipment with the barcode number P8988000126 to remain “Unloaded”', done => {

        PackageModel.findOne({barcode: 'P8988000126'}, '-_id barcode status').then((_package) => {

            console.table([_package?.toObject()]);

            done();

        })

    })

    after(done => {
        console.log('**** EXPECTED TEST RESULTS DONE ****');
        done();
    })

})