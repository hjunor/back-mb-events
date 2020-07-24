const mongoose = require('mongoose');
const uuid = require('uuid')
const EventSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: true,
    },
    file: {
      type: String,
    },
    title: {
      type: String,
      required: true,

    },
    types: {
      type: String,
      ref: 'Types',
      required: true,
    },
    category: {
      type: String,
      ref: 'Category',
      required: true,
    },
    tickets: {
      type: String,
      required: true,

    },
    adress: {
      type: Object,
      required: true,

    },
    description: {
      type: String,
      required: true,

    },
    price: {
      type: String,
      required: true,

    },
    id_user: {
      type: String,
      ref: 'Users',
      required: true
    },
    users: [{
      type: String,
      ref: 'Users'
    }],
    date: {
      type: String,
      required: true
    },
    hours: {
      type: String,
      required: true
    }


  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', EventSchema);