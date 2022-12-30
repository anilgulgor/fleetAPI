# NodeJS Fleet API

Fleet api is an experimental imaginary fleet corporate API written in Typescript with NodeJS Framework.\
It uses **Hapi** for all incoming requests. \
**Swagger (OpenAPI)** is used to create API documentation page with 'try it out' button to try all endpoints of fleet api service.

**Mongo DB** is used to store datas. **Mongo Express** is used for managing data collections and documents with web based admin interface.

Project is dockerized with **fleet-api**, **mongo image**, **mongo-express image** and **fleet-api-test** which is built with fleet-api image.

## Installation

Docker must be installed on computer before building app.
[get docker](https://docs.docker.com/get-docker/) to install Docker.

After installing docker on computer, (be sure that docker-compose.yml file is in the main path), run script below:

```bash
docker-compose up --build
```
This script will get mongo and mongo-express image, create volume for mongodb, build fleet-api from Dockerfile in application main path, and build fleet-api-test service for testing application.

After building, Fleet-Api-Test service will wait for other services to run and when it is ready, it call 'npm run test' command to test the fleet-api service.

If it gives any **mongo connection** error, just run the docker compose up script again. Downloaded packages while in building phase are cached. No need to build again.

```bash
docker-compose up
```

## Usage

While app is running,\
you can go http://localhost:8000 [fleet-api](http://localhost:8000) to get the main page of swagger documentation of application. You also can go https://localhost:8081 [mongo-express](http://localhost:8081) to access fleet api db to manage datas.

## Test

When the application starts, fleet-api-test service in container call these endpoints respectively to create related datas in the assignment scenario.

- vehicle/create (POST) to create vehicle with plate '34 TL 34'
- deliveryPoint/create (POST) to create delivery points which are branch, distribution center, transfer center
- bag/create (POST) to create bags
- package/create (POST) to create packages
- package/assignToBag (PUT) to assign packages with given bags
- deliver/attempToDeliver (POST) to attempt deliver (figure 6 in assignment) 

After datas are created, expected.spec.ts will run and the results of expected.spec.ts are the expected results that you expect from the application.

Test results of application will be like:

```bash
fleet-api-test_1  |   Create Vehicle
fleet-api-test_1  |     ✔ It should create vehicle with plate: 34 TL 34 (94ms)
fleet-api-test_1  |     ✔ It should NOT create vehicle with numeric characters
fleet-api-test_1  |
fleet-api-test_1  |   Create DeliveryPoints
fleet-api-test_1  |     ✔ It should create delivery point with value 1 : Branch
fleet-api-test_1  |     ✔ It should create delivery point with value 2 : Distribution Center
fleet-api-test_1  |     ✔ It should create delivery point with value 3 : Transfer Center
fleet-api-test_1  |     ✔ It should NOT create delivery point with string value like 3ABC
fleet-api-test_1  |
fleet-api-test_1  |   Create Bags
fleet-api-test_1  |     ✔ It should create bag with barcode: C725799 with delivery point: 2
fleet-api-test_1  |     ✔ It should create bag with barcode: C725800 with delivery point: 3
fleet-api-test_1  |     ✔ It should NOT create bag with numeric barcode with delivery point: 3
fleet-api-test_1  |
fleet-api-test_1  |   Create Packages
fleet-api-test_1  |     ✔ It should create packages (203ms)
fleet-api-test_1  |     ✔ It should NOT create packages with package without volumetricWeight
fleet-api-test_1  |
fleet-api-test_1  |   Assign Packages
fleet-api-test_1  |     ✔ It should assign package barcode: P8988000122 to bag barcode: C725799 (55ms)
fleet-api-test_1  |     ✔ It should assign package barcode: P8988000126 to bag barcode: C725799
fleet-api-test_1  |     ✔ It should assign package barcode: P9988000128 to bag barcode: C725800
fleet-api-test_1  |     ✔ It should assign package barcode: P9988000129 to bag barcode: C725800
fleet-api-test_1  |     ✔ It should NOT assign package barcode: XXXXXXX to bag barcode: C725800
fleet-api-test_1  |
fleet-api-test_1  |   Attempt to deliver
fleet-api-test_1  |     ✔ It should attempt deliver with vehicle plate: 34 TL 34 and including shipments (288ms)
fleet-api-test_1  |     ✔ It should NOT attempt deliver without vehicle
fleet-api-test_1  |
fleet-api-test_1  |   **** EXPECTED TEST RESULTS ****
fleet-api-test_1  | ┌─────────┬───────────────┬──────────────────────────────────┐
fleet-api-test_1  | │ (index) │    barcode    │              status              │
fleet-api-test_1  | ├─────────┼───────────────┼──────────────────────────────────┤
fleet-api-test_1  | │    0    │ 'P7988000121' │ { status: 'Unloaded', value: 4 } │
fleet-api-test_1  | │    1    │ 'P7988000122' │ { status: 'Unloaded', value: 4 } │
fleet-api-test_1  | │    2    │ 'P7988000123' │ { status: 'Unloaded', value: 4 } │
fleet-api-test_1  | │    3    │ 'P8988000121' │  { status: 'Loaded', value: 3 }  │
fleet-api-test_1  | │    4    │ 'P8988000122' │ { status: 'Unloaded', value: 4 } │
fleet-api-test_1  | │    5    │ 'P8988000123' │ { status: 'Unloaded', value: 4 } │
fleet-api-test_1  | │    6    │ 'P8988000124' │ { status: 'Unloaded', value: 4 } │
fleet-api-test_1  | │    7    │ 'P8988000125' │ { status: 'Unloaded', value: 4 } │
fleet-api-test_1  | │    8    │ 'P8988000126' │ { status: 'Unloaded', value: 4 } │
fleet-api-test_1  | │    9    │ 'P9988000126' │  { status: 'Loaded', value: 3 }  │
fleet-api-test_1  | │   10    │ 'P9988000127' │  { status: 'Loaded', value: 3 }  │
fleet-api-test_1  | │   11    │ 'P9988000128' │ { status: 'Unloaded', value: 4 } │
fleet-api-test_1  | │   12    │ 'P9988000129' │ { status: 'Unloaded', value: 4 } │
fleet-api-test_1  | │   13    │ 'P9988000130' │  { status: 'Loaded', value: 3 }  │
fleet-api-test_1  | │   14    │   'C725799'   │ { status: 'Unloaded', value: 4 } │
fleet-api-test_1  | │   15    │   'C725800'   │ { status: 'Unloaded', value: 4 } │
fleet-api-test_1  | └─────────┴───────────────┴──────────────────────────────────┘
fleet-api-test_1  |     ✔ Show the status of loaded and unloaded shipments on the database. (40ms)
fleet-api-test_1  | ┌─────────┬───────────────┬─────────────────────────────────┐
fleet-api-test_1  | │ (index) │    barcode    │             status              │
fleet-api-test_1  | ├─────────┼───────────────┼─────────────────────────────────┤
fleet-api-test_1  | │    0    │ 'P8988000120' │ { status: 'Created', value: 1 } │
fleet-api-test_1  | └─────────┴───────────────┴─────────────────────────────────┘
fleet-api-test_1  |     ✔ Show the status of the shipment with the barcode number P8988000120 to remain “created”.
fleet-api-test_1  | ┌─────────┬───────────────┬───────────────┐
fleet-api-test_1  | │ (index) │    barcode    │ deliveryPoint │
fleet-api-test_1  | ├─────────┼───────────────┼───────────────┤
fleet-api-test_1  | │    0    │ 'P8988000121' │       1       │
fleet-api-test_1  | │    1    │   'C725799'   │       1       │
fleet-api-test_1  | └─────────┴───────────────┴───────────────┘
fleet-api-test_1  |     ✔ Show logs for barcode numbers P8988000121 and C725799 (due to attempt to deliver to the wrong point)
fleet-api-test_1  | ┌─────────┬───────────────┬────────────────────────────────┐
fleet-api-test_1  | │ (index) │    barcode    │             status             │
fleet-api-test_1  | ├─────────┼───────────────┼────────────────────────────────┤
fleet-api-test_1  | │    0    │ 'P8988000121' │ { status: 'Loaded', value: 3 } │
fleet-api-test_1  | └─────────┴───────────────┴────────────────────────────────┘
fleet-api-test_1  |     ✔ Show the status of the shipment with the barcode number P8988000121 to remain “loaded”
fleet-api-test_1  | ┌─────────┬───────────┬──────────────────────────────────┐
fleet-api-test_1  | │ (index) │  barcode  │              status              │
fleet-api-test_1  | ├─────────┼───────────┼──────────────────────────────────┤
fleet-api-test_1  | │    0    │ 'C725800' │ { status: 'Unloaded', value: 4 } │
fleet-api-test_1  | └─────────┴───────────┴──────────────────────────────────┘
fleet-api-test_1  |     ✔ the status of the bag with the barcode number C725800 to be “unloaded”.
fleet-api-test_1  | ┌─────────┬───────────────┬──────────────────────────────────┐
fleet-api-test_1  | │ (index) │    barcode    │              status              │
fleet-api-test_1  | ├─────────┼───────────────┼──────────────────────────────────┤
fleet-api-test_1  | │    0    │ 'P8988000122' │ { status: 'Unloaded', value: 4 } │
fleet-api-test_1  | └─────────┴───────────────┴──────────────────────────────────┘
fleet-api-test_1  |     ✔ Show the status of the shipment with the barcode number P8988000122 to remain “Unloaded”
fleet-api-test_1  | ┌─────────┬───────────────┬──────────────────────────────────┐
fleet-api-test_1  | │ (index) │    barcode    │              status              │
fleet-api-test_1  | ├─────────┼───────────────┼──────────────────────────────────┤
fleet-api-test_1  | │    0    │ 'P8988000126' │ { status: 'Unloaded', value: 4 } │
fleet-api-test_1  | └─────────┴───────────────┴──────────────────────────────────┘
fleet-api-test_1  |     ✔ Show the status of the shipment with the barcode number P8988000126 to remain “Unloaded”
fleet-api-test_1  | **** EXPECTED TEST RESULTS DONE ****
```


## Support
All feedbacks are welcome :) 
**anlglgr@gmail.com**
