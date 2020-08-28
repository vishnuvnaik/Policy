const policyService = require("../service/policy");
const policy = new policyService();

module.exports.policyInfo = (req, res) => {
  let response = {};
  let fileupload = req.file.path;
  // res.status(200).send({ data: fileupload });
  policy
    .policyInfo(fileupload)
    .then((data) => {
      response.success = true;
      response.message = "policy Data saved successfully";
      res.status(200).send({ data: response });
    })
    .catch((err) => {
      response.success = false;
      response.message = err;
      res.status(500).send({ data: response });
    });
};
module.exports.searchPolicyInfo = (req, res) => {
  let response = {};
  console.log(req.params.query);
  policy
    .search(req.params.query)
    .then((data) => {
      response.success = true;
      response.data = data;
      response.message = "Data get successfully";
      res.status(200).send({ data: response });
    })
    .catch((err) => {
      response.success = false;
      response.message = err;
      res.status(500).send({ data: response });
    });
};
