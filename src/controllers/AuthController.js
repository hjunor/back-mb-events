require("dotenv");
const UserSchema = require("../models/User");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

class AuthController {
  async authenticate(request, response) {
    const { email, password } = request.body;

    const [user] = await UserSchema.find({
      email: { $in: [email.toLowerCase()] },
    });

    if (!user) {
      return response.sendStatus(401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return response.sendStatus(401);
    }

    const token = JWT.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "1d",
    });

    response.json({
      token,
    });
  }
}

module.exports = new AuthController();
