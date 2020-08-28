const policyCarrier = require("../model/policyCarrier.js");
let policyCarrierModel = new policyCarrier();
module.exports = class agentService {
  async policyCarrier(req) {
    let finddata = await policyCarrierModel.find(req);
    if (finddata) {
      return finddata;
    } else {
      policyCarrierModel
        .create(req)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          return err;
        });
    }
  }
};
