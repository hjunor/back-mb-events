const bcrypt = require("bcrypt");
const WebToken = require("../utils/jwt");
const UserRepository = require("../repository/userRepository");
class AuthController {
  async authenticate(request, response) {
    const { email, password } = request.body;

    const user = await UserRepository.findEmail(email);

    if (!user) {
      return response.sendStatus(401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return response.sendStatus(401);
    }

    const token = WebToken.create(user.id);

    response.json({
      token,
    });
  }
}

module.exports = new AuthController();
