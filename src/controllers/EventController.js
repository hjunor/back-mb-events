const EventShema = require('../models/Event');
const UserShema = require('../models/User')
const uuid = require('uuid');

class EventController {
  async store(request, response) {
    const { tickets, title, price, types, category, street, neighborhood, city, number, state, id_user, description, date, hours } = request.body
    const file = request.file.filename;

    const user = await UserShema.findById(id_user)

    if (!user || user.admin === false) {
      return response.status(400).json({ error: 'no authorizade' });
    }

    const event = await EventShema.create({
      _id: uuid.v4(),
      file,
      tickets,
      title,
      price,
      types,
      category,
      adress: {
        street,
        number,
        neighborhood,
        city,
        state
      },
      id_user,
      description,
      date,
      hours
    })
    return response.json(event)
  }
  index(request, response) {
    const { id } = request.query

    response.json({ ok: id })
  }

}

module.exports = new EventController()