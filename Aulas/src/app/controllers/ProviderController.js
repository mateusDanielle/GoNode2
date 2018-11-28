const { User, Appointment } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class ProviderController {
  async index (req, res) {
    console.log(req.session.user)
    const appointments = await Appointment.findAll({
      include: [{ model: User, as: 'user' }],
      where: {
        provider_id: req.session.user.id,
        date: {
          [Op.between]: [
            moment()
              .startOf('day')
              .format(),
            moment()
              .endOf('day')
              .format()
          ]
        }
      }
    })

    return res.render('providers/home', { appointments })
  }
}

module.exports = new ProviderController()
