// const ICrud = require("./base/interfaceDb");
const Mongoose = require("mongoose");

class MongoDB {
  constructor() {
    this._driver = Mongoose.connection;
    this._url = process.env.URL;
    this._option = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    };

    this._status = {
      0: "Disconectado",
      1: "Conectado",
      2: "Conectando",
      3: "Disconectando",
    };
  }
  async isConnected() {
    const state = this._status[Mongoose.connection.readyState];

    console.log(state);
  }

  connect() {
    Mongoose.connect(this._url, this._option, (erro) => {
      !erro ? this.isConnected() : console.log(erro);
    });
  }
}

module.exports = new MongoDB();
