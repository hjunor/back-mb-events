const mongoose = require('mongoose');

const CategoryShema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: true,
    },
    title: {
      required: true,
      type: String,
    }
  },
  { timestamps: false }
);

module.exports = mongoose.model('Category', CategoryShema);