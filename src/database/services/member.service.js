const AppError = require("../../utils/AppError");
const Register = require("../models/register.model");

/**
 *
 * @param {string} userId
 * @param {string} username
 * @param {string} firstname
 * @param {string} lastname
 * @param {string} email
 * @param {string} walletaddress
 * @param {integer}  tel
 * @param {integer} subscriptionId
 */

async function _createNewMember({
  userId,
  username,
  firstname,
  lastname,
  email,
  walletaddress,
  tel,
  subscriptionId,
}) {
  const [result, created] = await Register.findOrCreate({
    where: { userId },
    defaults: {
      userId,
      username,
      firstname,
      lastname,
      email,
      walletaddress,
      tel,
      subscriptionId,
    },
  }).catch((e) => {
    throw new AppError(e.message, 500, "createNewMember");
  });

  return !created ? null : result;
}

async function _allMembers() {
  const results = await Register.findAll().catch((e) => {
    throw new AppError(e.message, 500, "allMembers[service]", false, e);
  });

  return results == undefined ? [] : results;
}

async function _oneMember(userId) {
  const result = await Register.findOne({ where: { userId } }).catch((e) => {
    throw new AppError(e.message, 500, "oneMember[service]", false, e);
  });

  return result == undefined ? null : result;
}

async function _updateMember(userId, data) {
  const result = await Register.update(data, { where: { userId } }).catch(
    (e) => {
      throw new AppError(e.message, 500, "updateMember[service]", false, e);
    }
  );

  return result <= 0 ? false : true;
}

async function _deleteMember(userId) {
  const result = await Register.delete({ where: userId }).catch((e) => {
    throw new AppError(e.message, "deleteMember[service]", false, e);
  });

  return result <= 0 ? false : true;
}

module.exports = {
  _createNewMember,
  _allMembers,
  _oneMember,
  _updateMember,
  _deleteMember,
};
