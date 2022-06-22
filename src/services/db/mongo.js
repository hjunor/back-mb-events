// const ICrud = require("./base/interfaceDb");
const Mongoose = require("mongoose");

class MongoDB {
  constructor() {
    this.url = process.env.URL;
    this.option = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    };
    this.database = Mongoose;
    this.status = {
      0: "Desconectado",
      1: "Conectado",
      2: "Conectando",
      3: "Desconectando",
    };
  }
  async isConnected() {
    const state = this.status[this.database.connection.readyState];

    console.log(state);
  }

  connect() {
    this.database.connect(this.url, this.option, (erro) => {
      !erro ? this.isConnected() : console.log(erro);
    });
  }
}

module.exports = new MongoDB();
