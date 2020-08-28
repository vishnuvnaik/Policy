const policyInfo = require("../model/policyInfo.js");
let policyInfoModel = new policyInfo();
module.exports = class agentService {
  async policyInfo(req) {
    policyInfoModel
      .create(req)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        return err;
      });
  }
};
