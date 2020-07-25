const UserShema = require('../models/User')
const bcrypt = require('bcrypt')
class UsersController {
  async index(request, response) {
    const usersDb = await UserShema.find()

    const users = usersDb.map((user) => {
      return { id: user._id, name: user.name }
    });

    return response.json(users);
  }

  async create(request, response) {
    const { name, email, password, admin } = request.body;

    function validateEmail(email) {
      const regex = /\S+@\S+\.\S+/;
      return regex.test(String(email).toLowerCase());
    }

    const result = validateEmail(email);

    if (!result) {
      return response.json({ error: 'Email invalid' });
    }

    UserShema.find({
      email: { $in: [email.toLowerCase()] },
    })
      .then(async (user) => {
        const newUser = await UserShema.create({
          name,
          email,
          password,
          admin,
        });
        return response.json({ id: newUser.id, email: newUser.email, admin: newUser.admin });
      })
      .catch((error) => {
        return response.json({
          message: 'Usuario Exixtente na Base de dados'
        });
      });
  }

  async delete(request, response) {
    const { id } = request.params
    const user = await UserShema.findByIdAndDelete({
      _id: id
    })
    response.json(user)

  }

  async update(request, response) {
    const { name, email, password } = request.body;
    const { id } = request.params;

    function validateEmail(email) {
      const regex = /\S+@\S+\.\S+/;
      return regex.test(String(email).toLowerCase());
    }

    const result = validateEmail(email);

    if (!result) {
      return response.json({ error: 'Email invalid' });
    }
    const hash = await bcrypt.hash(password, 10);

    const newUpdate = await UserShema.findByIdAndUpdate(id, {
      name,
      email,
      password: hash,
    }, { new: true });
    return response.json(newUpdate);


  }
}

module.exports = new UsersController()