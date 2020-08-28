const agent = require("../service/agent.js");
userAccount = require("../service/userAccount.js");
user = require("../service/user");
policyCarrier = require("../service/policyCarrier");
policyCategory = require("../service/policyCategory");
policyInfo = require("../service/policyInfo");
const userName = require("../model/user");
let userModel = new userName();
const policyinfo = require("../model/policyInfo");
let policyinfoModel = new policyinfo();
let agentService = new agent();
let userAccountService = new userAccount();
let userService = new user();
let policyCarrierService = new policyCarrier();
let policyCategoryService = new policyCategory();
let policyInfoService = new policyInfo();

const agentM = require("../model/agent.js");
let agentModel = new agentM();

const Excel = require("exceljs");
var workbook = new Excel.Workbook();
module.exports = class policy {
  policyInfo(fileupload) {
    return new Promise((resolve, reject) => {
      workbook.csv.readFile(fileupload).then((worksheet) => {
        worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
          let currRow = worksheet.getRow(rowNumber);
          agentService
            .addAgent({
              agent_name: currRow.getCell(1).value,
            })
            .then((agentServiceData) => {
              userAccountService
                .userAccount({ account_name: currRow.getCell(14).value })
                .then((userAccountServiceData) => {
                  let userData = {
                    first_name: currRow.getCell(17).value,
                    Dob: currRow.getCell(24).value,
                    email: currRow.getCell(15).value,
                    phone_number: currRow.getCell(20).value,
                    zip_code: currRow.getCell(23).value,
                    state: currRow.getCell(22).value,
                    address: currRow.getCell(21).value,
                    gender: currRow.getCell(16).value,
                    user_type: currRow.getCell(2).value,
                  };
                  userService
                    .user(userData)
                    .then((userServicData) => {
                      policyCarrierService
                        .policyCarrier({
                          company_name: currRow.getCell(9).value,
                        })
                        .then((policyCarrierServiceData) => {
                          policyCategoryService
                            .policyCategory({
                              category_name: currRow.getCell(10).value,
                            })
                            .then((policyCategoryServiceData) => {
                              let policyInfoData = {
                                policy_number: currRow.getCell(5).value,
                                policy_start_date: currRow.getCell(11).value,
                                policy_end_date: currRow.getCell(12).value,
                                policy_category: currRow.getCell(8).value,
                                agent_id: agentServiceData._id,
                                user_id: userServicData._id,
                                user_account_id: userAccountServiceData._id,
                                policy_category_id:
                                  policyCategoryServiceData._id,
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
      });
    });
  }
  search = (req) => {
    return new Promise((resolve, reject) => {
      let searchData = {
        first_name: { $regex: new RegExp(req, "i") },
      };
      console.log("service", searchData);

      userModel
        .find(searchData)
        .then((data) => {
          data.forEach((data) => {
            console.log("data", data._id);

            policyinfoModel
              .find(data._id)
              .then((dataform) => {
                console.log(dataform);
                resolve(dataform);
              })
              .catch((err) => {
                reject(err);
              });
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};
