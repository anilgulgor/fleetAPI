import { DeliveryPayload, IShipmentDocument, IShipmentModel, RoutePayload } from "./Shipment";
import { ShipmentModel } from "./Shipment.model";
import { IBagDocument } from "../Bag/Bag";
import { IPackageDocument } from "../_Package/_Package";
import * as async from 'async';

export async function createShipment({ shipmentBarcode, bag, _package }: { shipmentBarcode: String, bag?: IBagDocument, _package?: IPackageDocument }): Promise<IShipmentDocument> {

    return new Promise<IShipmentDocument>((resolve, reject) => {

        ShipmentModel.create({
            shipmentBarcode: shipmentBarcode,
            bag: bag,
            package: _package
        }).then((newShipment) => {
            resolve(newShipment);
        }).catch((err) => {
            reject(err);
            return;
        })

    })

}

export async function getShipment({ shipmentBarcode }: {shipmentBarcode: String}): Promise<IShipmentDocument | null> {

    return new Promise<IShipmentDocument | null>((resolve, reject) => {

        return ShipmentModel.findOne({shipmentBarcode: shipmentBarcode})
        .populate({path: 'bag', model: 'Bag', populate: {path: 'destination', model: 'DeliveryPoint'}})
        .populate({path: 'package', model: 'Package', populate: {path: 'destination', model: 'DeliveryPoint'}})
        .then((shipment) => {
           if (shipment) {
               console.log(shipment);
               resolve(shipment);
               return;
           } else {
               resolve(null);
               return;
           }
        }).catch((err) => {
            reject(err);
            return;
        })

    })

}

export async function attemptToLoadShipments({ routes }: {routes: [RoutePayload]}): Promise<void> {

    return new Promise((resolve, reject) => {

        async.eachSeries((routes), (route, routeCallback) => {

            const deliveryPoint = route.deliveryPoint;

            const deliveries: [DeliveryPayload] = route.deliveries;

            async.eachSeries((deliveries), (delivery, deliveryCallback) => {

                ShipmentModel.getShipment({shipmentBarcode: delivery.barcode}).then((shipment) => {

                    if (shipment) {

                        if (shipment.bag) {
                            // shipment is bag
                            console.log('shipment is bag ' + JSON.stringify(shipment.bag));
                            shipment.bag.loadBag()
                            deliveryCallback();
                        } else if (shipment.package) {
                            // shipment is package
                            console.log('shipment is package ' + JSON.stringify(shipment.package));
                            shipment.package.loadPackage()
                            deliveryCallback();
                        } else {
                            deliveryCallback();
                        }

                    } else {
                        deliveryCallback();
                    }

                }).catch((err) => {
                    deliveryCallback(err);
                })

            }, (err) => {

                if (err) {
                    reject(err);
                    return;
                }

                routeCallback();

            })


        }, (err) => {

            if (err) {
                reject(err);
                return;
            }

            resolve();
            return;

        })

    })

}

// TODO: Attempt to unload shipments

export async function attemptToUnloadShipments({ routes }: {routes: [RoutePayload]}): Promise<any[]> {

    return new Promise<any[]>((resolve, reject) => {

        const routeAfterAttempt:any[] = [];

        async.eachSeries((routes), (route, routeCallback) => {

            const deliveryPoint = route.deliveryPoint;

            const deliveries: [DeliveryPayload] = route.deliveries;

            const deliveriesAfterAttempt:any[] = [];

            async.eachSeries((deliveries), (delivery, deliveryCallback) => {

                let deliveryAfterAttempt:any = {};

                ShipmentModel.getShipment({shipmentBarcode: delivery.barcode}).then((shipment) => {

                    if (shipment) {

                        if (shipment.bag) {
                            shipment.bag.unloadBagAndAssignedPackages(deliveryPoint);
                            deliveryAfterAttempt = {
                                barcode: shipment.bag.barcode,
                                state: shipment.bag.status.value
                            }
                            deliveriesAfterAttempt.push(deliveryAfterAttempt);
                            deliveryCallback();
                        } else if (shipment.package) {
                            shipment.package.unloadPackage(deliveryPoint);
                            deliveryAfterAttempt = {
                                barcode: shipment.package.barcode,
                                state: shipment.package.status.value
                            }
                            deliveriesAfterAttempt.push(deliveryAfterAttempt);
                            deliveryCallback();
                        } else {
                            deliveryCallback();
                        }

                    } else {
                        deliveryCallback();
                    }

                }).catch((err) => {
                    deliveryCallback(err);
                })

            }, (err) => {

                if (err) {
                    reject(err);
                    return;
                }

                routeAfterAttempt.push({
                    deliveryPoint: deliveryPoint,
                    deliveries: deliveriesAfterAttempt
                })

                routeCallback();

            })


        }, (err) => {

            if (err) {
                reject(err);
                return;
            }

            resolve(routeAfterAttempt);
            return;

        })

    })

}