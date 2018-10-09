import R from "ramda";
import VehBigchainDriver from "./index";

  const vehDriver = new VehBigchainDriver({
    network: 'http://188.166.15.225:9984/api/v1/',
    app_id: null,
    app_key: null
  });

  test();

  function showAsset(asset) {
    console.log(asset.id)
    console.log(asset.data)
  }

  async function test() {
      let deviceID = await vehDriver.registerDevice("SMART_METER", {lat: 51.923514, long: 4.469048}, 100, "office", 5);
      let asset = await vehDriver.getDeviceInfo(deviceID);

      console.log(asset.data);

      let reading = {
        timestamp: Date.now(),
        electricityReceived : {
            total: 0.7,
            tarrif1: 0.5,
            tariff2: 0.2
        },
        electricityDelivered : {
            total: 0.7,
            tarrif1: 0.5,
            tariff2: 0.2
        },
        gasReceived: 3
      }


      let updatedAsset = await vehDriver.update(deviceID, reading);
      console.log("UPDATED");
      console.log(updatedAsset.data);

      // let oneAsset = await vehDriver.getDeviceInfo(deviceID);
      // console.log("DEVICE INFO");
      // console.log(oneAsset.data);

      let allAssets = await vehDriver.getAssets();
      console.log("ALL ASSETS");
      R.map(showAsset, allAssets)
  }
