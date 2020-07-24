const mongoose = require('mongoose');
const uuid = require('uuid')
const CategoryShema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid.v4()
    },
    title: {
      required: true,
      type: String,
      unique: true,
    }
  },
  { timestamps: false }
);

module.exports = mongoose.model('Category', CategoryShema);