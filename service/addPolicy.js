const agent = require("../service/agent.js");
userAccount = require("../service/userAccount.js");
user = require("../service/user");
policyCarrier = require("../service/policyCarrier");
policyCategory = require("../service/policyCategory");
policyInfo = require("../service/policyInfo");

let agentService = new agent();
let userAccountService = new userAccount();
let userService = new user();
let policyCarrierService = new policyCarrier();
let policyCategoryService = new policyCategory();
let policyInfoService = new policyInfo();

const Excel = require("exceljs");
var workbook = new Excel.Workbook();
module.exports = class PolicyAdd {
  policyAdd(req) {
    return new Promise((resolve, reject) => {
      agentService
        .addAgent(req)
        .then((agentServiceData) => {
          // resolve(data);
          userAccountService
            .userAccount(req)
            .then((userAccountServiceData) => {
              // resolve(data);

              userService
                .user(req)
                .then((userServicData) => {
                  // resolve(data);
                  policyCarrierService
                    .policyCarrier(req)
                    .then((policyCarrierServiceData) => {
                      // resolve(data);
                      policyCategoryService
                        .policyCategory(req)
                        .then((policyCategoryServiceData) => {
                          // resolve(policyCategoryServiceData);
                          let policyInfoData = {
                            policy_number: req.policy_number,
                            policy_start_date: req.policy_start_date,
                            policy_end_date: req.policy_end_date,
                            policy_category: req.policy_category,
                            agent_id: agentServiceData._id,
                            user_id: userServicData._id,
                            user_account_id: userAccountServiceData._id,
                            policy_category_id: policyCategoryServiceData._id,
                            policy_carrier_id: policyCarrierServiceData._id,
                          };
                         
                          policyInfoService
                            .policyInfo(policyInfoData)
                            .then((data) => {
                              resolve(data);
                            })
                            .catch((err) => {
                              reject(err);
                            });
                        })
                        .catch((err) => {
                          reject(err);
                        });
                    })
                    .catch((err) => {
                      reject(err);
                    });
                })
                .catch((err) => {
                  reject(err);
                });
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};
