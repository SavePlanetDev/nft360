const AppError = require("../../utils/AppError");
const Subscription = require("../models/subscription.model");
/**
 * @param {string} userId
 * @param {string} planId
 * @param {timestamp} startdate
 * @param {timestamp} enddate
 * @param {bool} status
 */

async function _createNewSubscription({
  userId,
  planId = 1,
  startdate = new Date(),
  enddate = new Date(),
  status = false,
}) {
  const [result, created] = await Subscription.findOrCreate({
    where: { userId },
    defaults: { userId, planId, startdate, enddate, status },
  }).catch((e) => {
    throw new AppError(
      e.message,
      500,
      "createNewSubscription[service]",
      false,
      e
    );
  });

  return !created ? null : result;
}

async function _getAllSubscriptions() {
  const results = await Subscription.findAll().catch((e) => {
    throw new AppError(e.message, 500, "getAllSubscriptions", false, e);
  });
}

async function _getSubscriptionByUserId(userId) {
  const result = await Subscription.findOne({ where: { userId } }).catch(
    (e) => {
      throw new AppError(
        e.message,
        500,
        "getSubscriptionByUserId[service]",
        false,
        e
      );
    }
  );

  return result == undefined ? null : result;
}

async function _getSubscriptionById(subscriptionId) {
  const result = await Subscription.findOne({
    where: { subscriptionId },
  }).catch((e) => {
    throw new AppError(
      e.message,
      500,
      "getSubscriptionById[service]",
      false,
      e
    );
  });

  return result == undefined ? null : result;
}

async function _updateSubscription(userId, data) {
  const result = await Subscription.update(data, { where: userId }).catch(
    (e) => {
      throw new AppError(
        e.message,
        500,
        "updateSubscription[service]",
        false,
        e
      );
    }
  );

  return result <= 0 ? false : true;
}

async function _deleteSubscription(userId) {
  const result = await Subscription.delete({ where: userId }).catch((e) => {
    throw new AppError(e.message, 500, "deleteSubscription[service]", false, e);
  });

  return result <= 0 ? false : true;
}

module.exports = {
  _createNewSubscription,
  _getAllSubscriptions,
  _getSubscriptionById,
  _getSubscriptionByUserId,
  _updateSubscription,
  _deleteSubscription,
};
