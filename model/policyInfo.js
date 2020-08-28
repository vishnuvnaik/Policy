const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    policy_number: {
      type: String,
      required: [true, "policy_number must be provided"],
    },
    policy_start_date: {
      type: String,
      required: [true, "policy start date cannot be left blank"],
    },
    policy_end_date: {
      type: String,
      required: [true, "policy end date must be provided"],
    },
    policy_category: {
      type: String,
      required: [true, "phone number cannot be left blank"],
    },
    agent_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "agent",
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "user",
    },
    user_account_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "userAccount",
    },
    policy_category_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "policyCategory",
    },
    policy_carrier_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "policyCarrier",
    },
  },
  {
    timestamps: true,
  }
);

var policyInfoModel = mongoose.model("policyInfo", userSchema);
exports.policyInfoModel;

module.exports = class model {
  create(req) {
    let userDetails = new policyInfoModel(req);
    return userDetails.save();
  }
  find(id) {
    let o_id = mongoose.Types.ObjectId(id);
    return policyInfoModel.find({ user_id: o_id });
  }
};
