const mongoose = require('mongoose');

const URL = `mongodb://${process.env.USERS}:${process.env.PASSWORD}@localhost:27017/dev`;

const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(URL, option, (erro) => {
  !erro ? console.log('connect') : console.log(erro);
});