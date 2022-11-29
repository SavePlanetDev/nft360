const catchAsync = require("../../utils/catchAcsync");
const AppError = require("../../utils/AppError");
const { responseData } = require("../../utils/response");

const { _createNewMember } = require("../../database/services/member.service");
const {
  _createNewSubscription,
} = require("../../database/services/subscription.service");
const {
  _createNewProfile,
} = require("../../database/services/profile.service");

const createNewMember = catchAsync(async (req, res, next) => {
  const {
    userId,
    username,
    firstname,
    lastname,
    email,
    walletaddress,
    tel = 0,
  } = req.body;

  const subscribe = await _createNewSubscription({ userId }).catch((e) => {
    throw new AppError(e.message, 403, "createNewSubscription");
  });

  const registerInfo =
    subscribe == undefined
      ? next(
          new AppError(
            `${subscribe.subscriptionId}`,
            403,
            "subscription undefined"
          )
        )
      : await _createNewMember({
          userId,
          username,
          firstname,
          lastname,
          email,
          walletaddress,
          tel,
          subscriptionId: subscribe.subscriptionId,
        }).catch((e) =>
          next(new AppError(e.message, 403, "createNewMember", false))
        );

  const profile =
    subscribe == undefined || registerInfo == undefined
      ? next(
          new AppError(
            `user subscription data creation failed for ${userId}`,
            403
          )
        )
      : await _createNewProfile({
          userId,
          subscriptionId: subscribe.subscriptionId,
        });

  const responseObject = {
    ...registerInfo,
    ...profile,
    ...subscribe,
  };

  console.log(responseObject);

  return registerInfo && subscribe && profile
    ? responseData(res, responseObject, 201, "createNewMember", "OK")
    : next(new AppError(`cannot create new user`, 404, "createNewMember"));
});

module.exports = {
  createNewMember,
};
