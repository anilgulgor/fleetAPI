import chai from 'chai';
import chaiHttp = require('chai-http');
import { VehicleModel } from '../models/Vehicle/Vehicle.model';

chai.use(chaiHttp);
const should = chai.should();

const FLEET_API = process.env.FLEET_API_URL;

describe('Create Bags', () => {
    
    // Successful attempts

    it('It should create bag with barcode: C725799 with delivery point: 2', done => {

        chai.request(FLEET_API)
        .post('/bag/create')
        .send({
            barcode: 'C725799',
            deliveryPoint: 2,
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

    it('It should create bag with barcode: C725800 with delivery point: 3', done => {

        chai.request(FLEET_API)
        .post('/bag/create')
        .send({
            barcode: 'C725800',
            deliveryPoint: 3,
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

     // Unsuccessful attempts

     it('It should NOT create bag with numeric barcode with delivery point: 3', done => {

        chai.request(FLEET_API)
        .post('/bag/create')
        .send({
            barcode: 725800,
            deliveryPoint: 3,
        })
        .end((err, res) => {
            if (err) done(err);

            res.should.not.have.status(200);
            done();
        })

    })

})