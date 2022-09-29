/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import _ from 'lodash';
import userServices from '../services/user.services.js';
import { mailGenerator, transporter } from '../config/mail.config.js';

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
        message: 'User cannot be created without an email, mobile number and an Id'
      });
    }
    const newUser = await userServices.create(data);

    const verificationToken = newUser.generateToken();

    const url = `${process.env.APP_URL} + ${verificationToken}`;

    const response = {
      body: {
        name: `${req.body.firstName} ${req.body.lastName}`,
        intro: 'Email Verification Link',
        action: {
          instructions:
                'If you did not request for this mail, Please Ignore it. To Verify your Email password, click on the link below:',
          button: {
            text: 'Verify Email',
            link: url
          }
        },
        outro: 'Do not share this link with anyone.'
      }
    };

    const mail = mailGenerator.generate(response);

    const message = {
      from: 'Snellcart <snellcartapp@gmail.com>',
      to: req.body.email,
      subject: 'Verify Your Email',
      html: mail
    };

    await transporter.sendMail(message);

    return res.status(201).send({
      success: true,
      message: `Verify email sent to ${req.body.email}`,
      body: data
    });
  }
}

export default new UserController();
