/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import _ from 'lodash';
import userServices from '../services/user.services.js';

class UserController {
  async createUser(req, res) {
    const user = await userServices.findByEmail(req.body);
    if (!_.isEmpty(user)) {
      return res.status(400).send({
        success: false,
        message: 'User already exists'
      });
    }
    const data = { email: req.body.email, mobileNo: req.body.mobileNo, userId: req.body.userId };
    if (_.isEmpty(data)) {
      return res.status(404).send({
        success: false,
        message: 'User cannot be created without an email and a password'
      });
    }
    await userServices.create(data);

    return res.status(201).send({
      success: true,
      message: 'user created successfully',
      body: data
    });
  }
}

export default new UserController();
