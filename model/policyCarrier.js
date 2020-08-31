const mongoose = require("mongoose");

const policyCarrierSchema = mongoose.Schema(
  {
    company_name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

var policyCarrierModel = mongoose.model("policyCarrier", policyCarrierSchema);
exports.policyCarrierModel;

module.exports = class model {
  create(req) {
    let company_name = new policyCarrierModel(req);
    return company_name.save();
  }
  find(req) {
    return policyCarrierModel.findOne(req);
  }
};
