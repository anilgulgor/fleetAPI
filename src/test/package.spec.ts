import chai from 'chai';
import chaiHttp = require('chai-http');
import { VehicleModel } from '../models/Vehicle/Vehicle.model';

chai.use(chaiHttp);
const should = chai.should();

const FLEET_API = process.env.FLEET_API_URL;

const Packages = [
    {
        barcode: 'P7988000121',
        deliveryPoint: 1,
        volumetricWeight: 5
    },
    {
        barcode: 'P7988000122',
        deliveryPoint: 1,
        volumetricWeight: 5
    },
    {
        barcode: 'P7988000123',
        deliveryPoint: 1,
        volumetricWeight: 9
    },
    {
        barcode: 'P8988000120',
        deliveryPoint: 2,
        volumetricWeight: 33
    },
    {
        barcode: 'P8988000121',
        deliveryPoint: 2,
        volumetricWeight: 17
    },
    {
        barcode: 'P8988000122',
        deliveryPoint: 2,
        volumetricWeight: 26
    },
    {
        barcode: 'P8988000123',
        deliveryPoint: 2,
        volumetricWeight: 35
    },
    {
        barcode: 'P8988000124',
        deliveryPoint: 2,
        volumetricWeight: 1
    },
    {
        barcode: 'P8988000125',
        deliveryPoint: 2,
        volumetricWeight: 200
    },
    {
        barcode: 'P8988000126',
        deliveryPoint: 2,
        volumetricWeight: 50
    },
    {
        barcode: 'P9988000126',
        deliveryPoint: 3,
        volumetricWeight: 15
    },
    {
        barcode: 'P9988000127',
        deliveryPoint: 3,
        volumetricWeight: 16
    },
    {
        barcode: 'P9988000128',
        deliveryPoint: 3,
        volumetricWeight: 55
    },
    {
        barcode: 'P9988000129',
        deliveryPoint: 3,
        volumetricWeight: 28
    },
    {
        barcode: 'P9988000130',
        deliveryPoint: 3,
        volumetricWeight: 17
    },
]

describe('Create Packages', () => {

    // Unsuccessful attempts

    it('It should create packages', done => {

        for (let index = 0; index < Packages.length; index++) {
            const _package = Packages[index];
            chai.request(FLEET_API)
                .post('/package/create')
                .send({
                    barcode: _package.barcode,
                    deliveryPoint: _package.deliveryPoint,
                    volumetricWeight: _package.volumetricWeight
                })
                .end((err, res) => {
                    if (err) done(err);

                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a("object");
                    res.body.should.have.property("userMessage");

                    if (index == Packages.length - 1) {
                        done();
                    }

                })

        }

    })

    // Unsuccessful attempts

    it('It should NOT create packages with package without volumetricWeight', done => {

        chai.request(FLEET_API)
            .post('/package/create')
            .send({
                barcode: 'P9988000130',
                deliveryPoint: 3
            })
            .end((err, res) => {
                if (err) done(err);

                res.should.not.have.status(200);
                done();
            })



    })

})
