const TypesShema = require('../models/Types')
const UserShema = require('../models/User')
class TypesController {
  async store(request, response) {
    const { title, id } = request.body

    const user = await UserShema.findById(id)
    if (!user || user.admin === false) {
      return response.sendStatus(401).json({ error: 'no authorizade' });
    }

    const type = await TypesShema.create({
      title
    }).catch((error) => {
      return response.sendStatus(401).json({ error: 'no authorizade' });
    })

    return response.json(type);
  }
}

module.exports = new TypesController();