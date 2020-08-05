var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var advertisementSchema = new Schema({
  Title: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('advertisementSchema', advertisementSchema);