const policyCategory = require("../model/policyCategory.js");
let policyCategoryModel = new policyCategory();
module.exports = class agentService {
  async policyCategory(req) {
    let finddata = await policyCategoryModel.find(req);
    if (finddata) {
      return finddata;
    } else {
      policyCategoryModel
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


