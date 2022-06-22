require("dotenv");
const JWT = require("jsonwebtoken");

class WebToken {
  constructor() {
    this.secret = process.env.SECRET;
    this.expiresIn = "1d";
    this.webToken = JWT;
  }
  create(id) {
    return this.webToken.sign({ id }, this.secret, {
      expiresIn: this.expiresIn,
    });
  }
}

module.exports = new WebToken();
