import VehBigchainDriver from "./index";

const vehDriver = new VehBigchainDriver();

  test();

  async function test() {
      let deviceID = await vehDriver.registerDevice("ENERGY_METER", "0.1", "kWh", "51.923514, 4.469048");
      let asset = await vehDriver.getDeviceInfo(deviceID);
      console.log(asset.data);
      let updatedAsset = await vehDriver.update(deviceID, Date.now(), 100);
      console.log("UPDATED");
      console.log(updatedAsset.data);
      let burnedAsset = await vehDriver.burn(deviceID);
      console.log("BURNED");
      console.log(burnedAsset.data);
  }
