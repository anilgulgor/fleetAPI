import chai, { expect } from 'chai';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const should = chai.should();

const FLEET_API = process.env.FLEET_API_URL;

describe('Attempt to deliver', () => {

    // Successful attempts

    it('It should attempt deliver with vehicle plate: 34 TL 34 and including shipments', done => {
        const _plate = '34 TL 34'

        chai.request(FLEET_API)
            .post('/delivery/attemptToDeliver')
            .send({

                plate: "34 TL 34",
                route: [
                    {
                        deliveryPoint: 1,
                        deliveries: [
                            { barcode: "P7988000121" },
                            { barcode: "P7988000122" },
                            { barcode: "P7988000123" },
                            { barcode: "P8988000121" },
                            { barcode: "C725799" }
                        ]
                    },
                    {
                        deliveryPoint: 2,
                        deliveries: [
                            { barcode: "P8988000123" },
                            { barcode: "P8988000124" },
                            { barcode: "P8988000125" },
                            { barcode: "C725799" }
                        ]
                    },
                    {
                        deliveryPoint: 3,
                        deliveries: [
                            { barcode: "P9988000126" },
                            { barcode: "P9988000127" },
                            { barcode: "P9988000128" },
                            { barcode: "P9988000129" },
                            { barcode: "P9988000130" }
                        ]
                    }
                ]

            })
            .end((err, res) => {
                if (err) done(err);

                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a("object");
                res.body.should.have.property("route");
                expect(res.body).to.have.property('plate', '34 TL 34');
                expect(res.body.route[0].deliveries).to.be.an("array").that.deep.equals(
                    [
                        { "barcode": "P7988000121", "state": 4 },
                        { "barcode": "P7988000122", "state": 4 },
                        { "barcode": "P7988000123", "state": 4 },
                        { "barcode": "P8988000121", "state": 3 },
                        { "barcode": "C725799", "state": 3 }
                    ]
                );
                expect(res.body.route[1].deliveries).to.be.an("array").that.deep.equals(
                    [
                        { "barcode": "P8988000123", "state": 4 },
                        { "barcode": "P8988000124", "state": 4 },
                        { "barcode": "P8988000125", "state": 4 },
                        { "barcode": "C725799", "state": 4 }
                    ]
                );
                expect(res.body.route[2].deliveries).to.be.an("array").that.deep.equals(
                    [
                        { "barcode": "P9988000126", "state": 3 },
                        { "barcode": "P9988000127", "state": 3 },
                        { "barcode": "P9988000128", "state": 4 },
                        { "barcode": "P9988000129", "state": 4 },
                        { "barcode": "P9988000130", "state": 3 }
                    ]
                );
                done();
            })

    })

    // Unsuccessful attempts

    it('It should NOT attempt deliver without vehicle', done => {
        const _plate = '34 TL 34'

        chai.request(FLEET_API)
            .post('/delivery/attemptToDeliver')
            .send({
                route: [
                    {
                        deliveryPoint: 1,
                        deliveries: [
                            { barcode: "P7988000121" },
                            { barcode: "P7988000122" },
                            { barcode: "P7988000123" },
                            { barcode: "P8988000121" },
                            { barcode: "C725799" }
                        ]
                    }
                ]

            })
            .end((err, res) => {
                if (err) done(err);

                res.should.not.have.status(200);
                done();
            })

    })

})