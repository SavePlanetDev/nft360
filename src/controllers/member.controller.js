const catchAsync = require("../utils/catchAcsync");
const AppError = require("../utils/AppError");
const { responseData } = require("../utils/response");

const { _allMembers } = require("../database/services/member.service");

const getAllMembers = catchAsync(async (req, res, next) => {
  const holders = await _allMembers().catch((e) =>
    next(new AppError(e.message, 403, "getAllMembers", false))
  );

  return !holders
    ? next(new AppError("get all members failed.", 403, "getAllMembers"))
    : responseData(res, holders, 200, "getAllMembers", "all holders");
});

module.exports = {
  getAllMembers,
};
