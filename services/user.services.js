/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import { mailGenerator, transporter } from '../config/mail.config.js';
import userModel from '../models/user.model.js';

class UserServices {
  async confirmEmail(user) {
    // send mail
    const response = {

    };

    const mail = mailGenerator.generate(response);

    const message = {
      from: 'Snellcart <enere0115@gmail.com>',
      to: user.email,
      subject: 'Reset your password',
      html: mail
    };

    await transporter.sendMail(message);
    // return true;
  }

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
