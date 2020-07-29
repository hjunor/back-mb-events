require('dotenv');
const UserShema = require('../models/User');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

class AuthController {
  async authenticate(request, response) {
    const { email, password } = request.body;

    const [user] = await UserShema.find({
      email: { $in: [email.toLowerCase()] },
    });

    if (!user) {
      return response.sendStatus(401)
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return response.sendStatus(401)
    }

    const token = JWT.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: '1d',
    });


    response.json({
      user: {
        id: user.id,
        email: user.email,
        admin: user.admin,
        name: user.name,
      },
      token
    });
  }
}

module.exports = new AuthController();