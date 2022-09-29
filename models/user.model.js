/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';

const userSchema = mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true
  },

  userID: {
    type: Number,
    required: true
  },
  mobileNo: {
    type: Number,
    required: true
  }

}, { timestamps: true });

const userModel = mongoose.model('users', userSchema);

export default userModel;
