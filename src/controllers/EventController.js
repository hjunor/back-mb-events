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
      file: `http://localhost:3333/uploads/${file}`,
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
  async update(request, response) {
    const {
      tickets,
      title,
      price,
      types,
      category,
      street,
      neighborhood,
      city,
      number,
      state,
      id_user,
      description,
      date,
      hours } = request.body
    const file = request.file.filename
    const { id } = request.params
    const user = await UserShema.findById(id_user)

    if (!user || user.admin === false) {
      return response.status(400).json({ error: 'no authorizade' });
    }

    const event = await EventShema.findByIdAndUpdate(id, {
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
      description,
      date,
      hours,
      id_user,
    }, { new: true })
    return response.json(event)
  }
  async index(request, response) {
    const event = await EventShema.find();

    response.json(event)
  }
  async delete(request, response) {
    const { id, id_user } = request.params
    const user = await UserShema.findById(id_user)

    if (!user || user.admin === false) {
      return response.status(400).json({ error: 'no authorizade' });
    }
    const event = await EventShema.findByIdAndDelete({
      _id: id
    })

    return response.json(event)
  }
  async storeUser(request, response) {
    const { id } = request.params
    const { id_user } = request.body
    const user = await EventShema.findById(id)
    if (!user) {
      return response.status(400).json({ error: 'no authorizade' });
    }
    const arry = [...user.users, id_user]
    const event = await EventShema.findByIdAndUpdate(id, {
      users: arry
    }, { new: true })

    return response.json(event)

  }
  async indexUser(request, response) {
    const { id } = request.params
    const user = await UserShema.findById(id)
    if (!user) {
      return response.status(400).json({ error: 'no authorizade' });
    }
    const event = await EventShema.find({ users: id });

    return response.json(event)
  }
}

module.exports = new EventController();