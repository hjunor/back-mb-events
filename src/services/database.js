const mongoose = require('mongoose');

const URL = `mongodb://${process.env.USERS}:${process.env.PASSWORD}@localhost:27017/dev`;

const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
};

mongoose.connect(URL, option, (erro) => {
  !erro ? console.log('connect', process.env.SECRET) : console.log(erro);
});