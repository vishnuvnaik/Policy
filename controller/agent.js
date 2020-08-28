
const agentService = require("../service/agent");

module.exports.agent = (req, res) => {
  let response = {};
  agentService
    .addAgent(req)
    .then((data) => {
      response.success = true;
      response.data = data;
      response.message = "agent_name Data saved successfully";
      res.status(200).send({ data: fileupload });
    })
    .catch((err) => {
      response.success = false;
      response.message = err;
      res.status(500).send({ data: response });
    });
};
