import { IIncorrectlySentShipmentDocument } from "./IncorrectlySentShipment";
import { IncorrectlySentShipmentModel } from "./IncorrectlySentShipment.model";

export async function createIncorrectlySentShipmentLog({ barcode, deliveryPoint}: { barcode: String, deliveryPoint: Number }): Promise<IIncorrectlySentShipmentDocument> {

    return new Promise<IIncorrectlySentShipmentDocument>((resolve, reject) => {

        IncorrectlySentShipmentModel.create({
            barcode: barcode,
            deliveryPoint: deliveryPoint
        }).then((newIncorrectlySentShipment) => {
            resolve(newIncorrectlySentShipment);
        }).catch((err) => {
            reject(err);
            return;
        })

    })

}