const mongoose = require('mongoose');

const TypesSchema = new mongoose.Schema(
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

module.exports = mongoose.model('Types', TypesSchema);