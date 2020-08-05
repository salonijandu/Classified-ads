const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String,
  googleName: String
});

mongoose.model('UserSchema', userSchema);
