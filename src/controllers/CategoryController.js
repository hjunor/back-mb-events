const CategoryShemma = require('../models/Category');
const UserShema = require('../models/User')
class CategoryController {
  async store(request, response) {
    const { title, id } = request.body

    const user = await UserShema.findById(id)
    if (!user || user.admin === false) {
      return response.sendStatus(401).json({ error: 'no authorizade' });
    }

    const category = await CategoryShemma.create({
      title
    }).catch((error) => {
      return response.sendStatus(401).json({ error: 'no authorizade' });
    })

    return response.json(category);
  }
}

module.exports = new CategoryController();