// const ICrud = require("./base/interfaceDb");
const Mongoose = require("mongoose");
const STATUS = {
  0: "Disconectado",
  1: "Conectado",
  2: "Conectando",
  3: "Disconectando",
};

const URL = `mongodb://dev:123456@localhost:27017/dev?authSource=admin`;

const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

class MongoDB {
  constructor() {
    //super();
    //this._herois = null;
    this._driver = Mongoose.connection;
  }
  async isConnected() {
    const state = STATUS[Mongoose.connection.readyState];

    console.log(state);
  }

  connect() {
    Mongoose.connect(URL, option, function (error) {
      if (!error) return;
      console.log("Falha na conexão!");
    });
  }

  // async create(item) {
  //   return this._herois.create(item);
  // }
  // async read(item = {}) {
  //   return this._herois.find(item, { nome: 1, poder: 1, insertedAt: 1 });
  // }
  // async update(id, item) {
  //   return this._herois.updateOne({ _id: id }, { $set: item });
  // }

  // async delete(id) {
  //   return this._herois.deleteOne({ _id: id });
  // }
}

module.exports = new MongoDB();
