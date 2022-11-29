const catchAsync = require("../utils/catchAcsync");
const AppError = require("../utils/AppError");
const { responseData } = require("../utils/response");

const {
  _getSubscriptionById,
  _getSubscriptionByUserId,
} = require("../database/services/subscription.service");

/**
 * @param {string} userId
 * @param {string} planId
 * @param {timestamp} startdate
 * @param {timestamp} enddate
 * @param {bool} status
 */

const getSubscriptionById = catchAsync(async ({ subscriptonId }, res, next) => {
  const sub = await _getSubscriptionById(subscriptonId).catch((e) =>
    next(new AppError(e.message, 403, "getSubscirptionById"))
  );

  return !sub
    ? next(
        new AppError(
          `no found subscription with Id : ${subscriptonId}`,
          404,
          "getSubscriptionById"
        )
      )
    : responseData(res, sub, 200, "getSubscriptionById", "OK");
});

const getSubscriptionByUserId = catchAsync(
  async ({ userId }, req, res, next) => {
    const sub = await _getSubscriptionByUserId(userId).catch((e) =>
      next(new AppError(e.message, 403, "getSubscirptionByUserId"))
    );

    return !sub
      ? next(
          new AppError(
            `no found subscription with userId : ${userId}`,
            404,
            "getSubscriptionByUserId"
          )
        )
      : responseData(res, sub, 200, "getSubscriptionByUserId", "OK");
  }
);

module.exports = {
  getSubscriptionById,
  getSubscriptionByUserId,
};
