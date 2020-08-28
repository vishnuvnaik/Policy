const mongoose = require("mongoose");

const policyCategorySchema = mongoose.Schema(
  {
    category_name: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

var policyCategoryModel = mongoose.model(
  "policyCategory",
  policyCategorySchema
);
exports.policyCategoryModel;

module.exports = class model {
  create(req) {
    let category_name = new policyCategoryModel(req);
    return category_name.save();
  }
  find(req) {
    return policyCategoryModel.findOne(req);
  }
};
