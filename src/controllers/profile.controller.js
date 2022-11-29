const catchAsync = require("../utils/catchAcsync");
const AppError = require("../utils/AppError");
const { responseData } = require("../utils/response");

const { _getProfileById } = require("../database/services/profile.service");

const getProfileById = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const profile = await _getProfileById(userId).catch((e) =>
    next(new AppError(e.message, 403, "getProfileById"))
  );

  return !profile
    ? next(
        new AppError(`failed to fetch ${userId} profile`, 403, "getProfileById")
      )
    : responseData(res, profile, 200, "getProfilsById", "OK");
});

module.exports = {
  getProfileById,
};
