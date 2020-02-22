import Notificaion from '../schemas/NotificationSchema';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    /**
     * Validando se provider é provider
     */
    const isProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!isProvider) {
      return res.status(401).json({ error: 'Is not provider' });
    }

    const notifications = await Notificaion.find({
      user: req.userId,
    })
      .sort('createdAt')
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notificaion.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    return res.json(notification);
  }
}

export default new NotificationController();
