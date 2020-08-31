const agent = require("../model/agent.js");
let agentModel = new agent();
module.exports = class agentService {
  async addAgent(req) {
    let finddata = await agentModel.find(req);
    if (finddata) {
      return finddata;
    } else {
      agentModel
        .create(req)
        .then((data) => {
          console.log(req.agent);
          resolve(data);
        })
        .catch((err) => {
          return err;
        });
    }
  }
};
