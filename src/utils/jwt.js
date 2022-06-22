require("dotenv");
const JWT = require("jsonwebtoken");

class WebToken {
  create(id) {
    return JWT.sign({ id }, process.env.SECRET, {
      expiresIn: "1d",
    });
  }
}

module.exports = new WebToken();
