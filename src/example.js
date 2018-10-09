import VehBigchainDriver from "./index";

const vehDriver = new VehBigchainDriver();

  test();

  async function test() {
      let deviceID = await vehDriver.registerDevice("SMART_METER", {lat: 51.923514, long: 4.469048}, 100, "office", 5);
      let asset = await vehDriver.getDeviceInfo(deviceID);

      console.log("getting all");

      let assets = await vehDriver.getAllDevices();
      console.log(JSON.stringify(assets, null, 4));

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
      let burnedAsset = await vehDriver.burn(deviceID);
      console.log("BURNED");
      console.log(burnedAsset.data);
  }
