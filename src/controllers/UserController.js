const UserSchema = require("../models/User");
const bcrypt = require("bcrypt");
const UserRepository = require("../repository/userRepository");
const validateEmail = require("../utils/validate");
class UsersController {
  async index(request, response) {
    try {
      const id = request.id;
      const user = await UserRepository.read(id);
      return response.json(user);
    } catch (error) {
      return response.json({
        message: "Usuario Exixtente na Base de dados",
      });
    }
  }

  async create(request, response) {
    const { name, email, password, admin } = request.body;

    const result = validateEmail(email);

    if (!result) {
      return response.json({ error: "Email invalid" });
    }

    UserSchema.find({
      email: { $in: [email.toLowerCase()] },
    })
      .then(async (user) => {
        const newUser = await UserSchema.create({
          name,
          email,
          password,
          admin,
        });
        return response.json({
          id: newUser.id,
          email: newUser.email,
          admin: newUser.admin,
        });
      })
      .catch((error) => {
        return response.json({
          message: "Usuario Exixtente na Base de dados",
        });
      });
  }

  async delete(request, response) {
    const { id } = request.params;
    const user = await UserSchema.findByIdAndDelete({
      _id: id,
    });
    response.json(user);
  }

  async update(request, response) {
    const { name, email, password } = request.body;
    const { id } = request.params;

    const result = validateEmail(email);

    if (!result) {
      return response.json({ error: "Email invalid" });
    }
    const hash = await bcrypt.hash(password, 10);

    const newUpdate = await UserSchema.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password: hash,
      },
      { new: true }
    );
    return response.json(newUpdate);
  }
}

module.exports = new UsersController();
