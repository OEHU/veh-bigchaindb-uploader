import Bigchaindb from "bigchaindb-driver";
import Orm from "bigchaindb-orm";

class VehBigchainDriver {

  constructor(opts) {
      if(!opts){
        opts = {};
      }
      //initialise orm
      this.orm = new Orm( opts.network || "https://test.bigchaindb.com/api/v1/",
                          {  app_id: opts.app_id || '3b959424',
		                         app_key: opts.app_key || '30c12a0e15343d705a7e7ccb6d75f1c0'
                          });
      this.keyPair = opts.keypair || new this.orm.driver.Ed25519Keypair();
      this.orm.define("devices", "https://schema.org/v1/myModel")

      this.registerDevice = this.registerDevice.bind(this);
      this.getDeviceInfo = this.getDeviceInfo.bind(this);
      this.update = this.update.bind(this);
  }

  async registerDevice(_deviceType, _deviceReading, _readingMetric, _location) {
      console.log("BEGINNING REGISTRATION...");
      let asset = await this.orm.models.devices.create({ keypair: this.keyPair,
                            	        data: { deviceType: _deviceType,
                            					deviceReading: _deviceReading,
                            					readingMetric: _readingMetric,
                            					location: _location,
                            					lastReadingTime: 'n/a',
                            					lastReadingOutput: 'n/a'
			}});
      console.log(`\n\nASSET CREATED\n\nASSET ID: ${asset.id}  \nASSET TYPE: ${asset.data.deviceType}
				\nASSET READING: ${asset.data.deviceReading} \nMEASUREMENT METRIC:${asset.data.readingMetric}`);

      return asset.id; //return the device id
  }

  async getDeviceInfo(deviceID) {
      let asset = await this.orm.models.devices.retrieve(deviceID);
      return asset[0];
  }

  async update(_deviceID, _time, _newReading) {
      let asset = await this.getDeviceInfo(_deviceID);

      let updatedAsset = await asset.append({
	            toPublicKey: this.keyPair.publicKey,
	            keypair: this.keyPair,
				data: { deviceType: asset.data.deviceType,
						deviceReading: asset.data.deviceReading,
						readingMetric: asset.data.readingMetric,
						location: asset.data.location,
						lastReadingTime: _time,
						lastReadingOutput: _newReading
					},
			});

      return updatedAsset;
  }

  async burn(_deviceID) {
      let asset = await this.getDeviceInfo(_deviceID);

      let burnedAsset = await asset.burn({
	            keypair: this.keyPair
	        });

      return burnedAsset;
  }

}

export default VehBigchainDriver;
