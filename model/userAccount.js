const mongoose = require("mongoose");

const userAccountSchema = mongoose.Schema(
  {
    account_name: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

var userAccountModel = mongoose.model("userAccount", userAccountSchema);
exports.userAccountModel;

module.exports = class model {
  create(req) {
    let userName = new userAccountModel(req);
    return userName.save();
  }
  find(req) {
    return userAccountModel.findOne(req);
  }
};
