// const ICrud = require("./base/interfaceDb");
const Mongoose = require("mongoose");
const STATUS = {
  0: "Disconectado",
  1: "Conectado",
  2: "Conectando",
  3: "Disconectando",
};

const URL = process.env.URL;

const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

class MongoDB {
  constructor() {
    this._driver = Mongoose.connection;
  }
  async isConnected() {
    const state = STATUS[Mongoose.connection.readyState];

    console.log(state);
  }

  connect() {
    Mongoose.connect(URL, option, (erro) => {
      !erro ? this.isConnected() : console.log(erro);
    });
  }
}

module.exports = new MongoDB();
