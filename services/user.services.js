/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import userModel from '../models/user.model.js';

class UserServices {
  async create(data) {
    const newUser = await userModel.create(data);
    return newUser;
  }

  async findByEmail(data) {
    const user = await userModel.findOne({ email: data.email });
    return user;
  }
}
export default new UserServices();
