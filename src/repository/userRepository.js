const UserSchema = require("../models/User");
const Validator = require("../utils/validate");
class UserRepository {
  constructor() {
    this.repository = UserSchema;
    this.validator = Validator;
    this.emailValidate = null;
    this.emailExists = null;
    this.user = false;
    this.status = 500;
    this.error = false;
  }

  async create(item) {
    try {
      this.emailValidate = this.validator.email(item.email);

      if (!this.emailValidate) {
        this.error = "Email invalido";
        this.status = 405;
        throw new Error(this.error);
      }

      this.emailExists = await this.find(item.email);

      if (this.emailExists) {
        this.error = "Usuário existente";
        this.status = 403;
        throw new Error(this.error);
      }

      this.user = await this.repository.create(item);
      this.status = 201;

      return {
        error: this.error,
        status: this.status,
        user: {
          id: this.user._id,
          name: this.user.name,
          email: this.user.email,
        },
      };
    } catch (error) {
      return { error: this.error, status: this.status, user: this.user };
    }
  }

  async read(id) {
    const user = await this.repository.findById(id);

    return { id: user._id, name: user.name, email: user.email };
  }

  async find(email) {
    const user = await this.repository.find({
      email: { $in: [email.toLowerCase()] },
    });
    return user.length > 0 ? true : false;
  }

  async findEmail(email) {
    const [user] = await this.repository.find({
      email: { $in: [email.toLowerCase()] },
    });
    return user;
  }

  async update(id, item) {
    return await this.repository.updateOne({ _id: id }, { $set: item });
  }

  async all() {
    return await this.repository.find();
  }

  async delete(id) {
    return await this.repository.deleteOne({ _id: id });
  }
}

module.exports = new UserRepository();
