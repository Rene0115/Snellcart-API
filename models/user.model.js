/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true
  },

  userId: {
    type: Number,
    required: true
  },
  mobileNo: {
    type: Number,
    required: true
  }

}, { timestamps: true });

userSchema.methods.generateToken = function t() { // t is short for token
  const token = jwt.sign({
    _id: this._id,
    email: this.email
  }, process.env.TOKEN_SECRET, { expiresIn: '10 mins' });

  return token;
};

const userModel = mongoose.model('users', userSchema);

export default userModel;
