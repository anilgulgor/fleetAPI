import chai, {expect} from 'chai';
import chaiHttp = require('chai-http');
import { VehicleModel } from '../models/Vehicle/Vehicle.model';
import ERRORS from './../shared/errors.json';

chai.use(chaiHttp);
const should = chai.should();

const FLEET_API = process.env.FLEET_API_URL;

describe('Assign Packages', () => {

    // Successful attempts
    
    it('It should assign package barcode: P8988000122 to bag barcode: C725799', done => {

        chai.request(FLEET_API)
        .put('/package/P8988000122/assignToBag')
        .send({
            bagBarcode: 'C725799'
        })
        .end((err, res) => {
            if (err) done(err);

            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a("object");
            res.body.should.have.property("userMessage");
            done();
        })

    })

    it('It should assign package barcode: P8988000126 to bag barcode: C725799', done => {

        chai.request(FLEET_API)
        .put('/package/P8988000126/assignToBag')
        .send({
            bagBarcode: 'C725799'
        })
        .end((err, res) => {
            if (err) done(err);

            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a("object");
            res.body.should.have.property("userMessage");
            done();
        })


    })

    it('It should assign package barcode: P9988000128 to bag barcode: C725800', done => {

        chai.request(FLEET_API)
        .put('/package/P9988000128/assignToBag')
        .send({
            bagBarcode: 'C725800'
        })
        .end((err, res) => {
            if (err) done(err);

            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a("object");
            res.body.should.have.property("userMessage");
            done();
        })

    })

    it('It should assign package barcode: P9988000129 to bag barcode: C725800', done => {

        chai.request(FLEET_API)
        .put('/package/P9988000129/assignToBag')
        .send({
            bagBarcode: 'C725800'
        })
        .end((err, res) => {
            if (err) done(err);

            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a("object");
            res.body.should.have.property("userMessage");
            done();
        })

    })

    // Unuccessful attempts

    it('It should NOT assign package barcode: XXXXXXX to bag barcode: C725800', done => {

        chai.request(FLEET_API)
        .put('/package/XXXXXXX/assignToBag')
        .send({
            bagBarcode: 'C725800'
        })
        .end((err, res) => {
            if (err) done(err);
            expect(res.body).to.have.property('status', ERRORS.PACKAGE_ERRORS.PKG_2);
            done();
        })

    })

})