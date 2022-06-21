const UserSchema = require("../models/User");
class UserRepository {
  constructor() {
    this.repository = UserSchema;
  }
  async create(item) {
    return await this.repository.create(item);
  }
  async read(id) {
    const user = await this.repository.findById(id);

    return { id: user._id, name: user.name, email: user.email };
  }
  async update(id, item) {
    return await this.repository.updateOne({ _id: id }, { $set: item });
  }

  async delete(id) {
    return await this.repository.deleteOne({ _id: id });
  }
}

module.exports = new UserRepository();
