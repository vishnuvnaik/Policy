const user = require("../model/user.js");
let userModel = new user();
module.exports = class agentService {
  async user(req) {
    let finddata = await userModel.find(req);
    if (finddata) {
      return finddata;
    } else {
      userModel
        .create(req)
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          return err;
        });
    }
  }
};
