import chai, { expect } from 'chai';
import chaiHttp = require('chai-http');
import { VehicleModel } from '../models/Vehicle/Vehicle.model';

chai.use(chaiHttp);
const should = chai.should();

const FLEET_API = process.env.FLEET_API_URL;

describe('Create Vehicle', () => {
    
    // Successful attempts

    it('It should create vehicle with plate: 34 TL 34', done => {
        const _plate = '34 TL 34'

        chai.request(FLEET_API)
        .post('/vehicle/create')
        .send({
            plate: _plate
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

    // Unsccessful attempts

    it('It should NOT create vehicle with numeric characters', done => {

        const _plate = 1234567

        chai.request(FLEET_API)
        .post('/vehicle/create')
        .send({
            plate: _plate
        })
        .end((err, res) => {
            if (err) done(err);

            res.should.not.have.status(200);
            res.should.be.json;
            done();
        })

    })

})