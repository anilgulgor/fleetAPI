import chai from 'chai';
import chaiHttp = require('chai-http');
import { VehicleModel } from '../models/Vehicle/Vehicle.model';

chai.use(chaiHttp);
const should = chai.should();

const FLEET_API = process.env.FLEET_API_URL;

describe('Create DeliveryPoints', () => {
    
    // Successful attempts

    it('It should create delivery point with value 1 : Branch', done => {

        chai.request(FLEET_API)
        .post('/deliveryPoint/create')
        .send({
            deliveryPoint: 'Branch',
            value: 1
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

    it('It should create delivery point with value 2 : Distribution Center', done => {

        chai.request(FLEET_API)
        .post('/deliveryPoint/create')
        .send({
            deliveryPoint: 'Distribution Center',
            value: 2
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

    it('It should create delivery point with value 3 : Transfer Center', done => {

        chai.request(FLEET_API)
        .post('/deliveryPoint/create')
        .send({
            deliveryPoint: 'Transfer Center',
            value: 3
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

    it('It should NOT create delivery point with string value like 3ABC', done => {

        chai.request(FLEET_API)
        .post('/deliveryPoint/create')
        .send({
            deliveryPoint: 'Transfer Center',
            value: '3ABC'
        })
        .end((err, res) => {
            if (err) done(err);

            res.should.not.have.status(200);
            done();
        })

    })    

})