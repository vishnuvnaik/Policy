const userAccount = require("../model/userAccount.js");
let userAccountModel = new userAccount();
module.exports = class agentService {
   userAccount(req) {
    // let finddata = await userAccountModel.find(req);
    // if (finddata) {
    //   return finddata;
    // } else {
    //   userAccountModel
    //     .create(req)
    //     .then((data) => {
    //       resolve(data);
    //     })
    //     .catch((err) => {
    //       return err;
    //     });
    // }
    return new Promise((resolve, reject) => {
      userAccountModel
        .create(req)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};
