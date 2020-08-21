const mongoose = require('mongoose');
const uuid = require('uuid');
const TypesSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid.v4(),
    },
    title: {
      type: String,
      required: true,
      unique: true,
    }
  },
  { timestamps: false }
);


module.exports = mongoose.model('Types', TypesSchema);