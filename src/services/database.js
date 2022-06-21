const mongoose = require("mongoose");

//const URL = `mongodb://${process.env.USERS}:${process.env.PASSWORD}@localhost:27017/dev`;
const URL = `mongodb://dev:123456@localhost:27017/dev?authSource=admin`;

const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

class MongoDB {
  connect() {
    mongoose.connect(URL, option, (erro) => {
      !erro ? console.log("connect data base") : console.log(erro);
    });
  }
}

module.exports = new MongoDB();
