const AppError = require("../../utils/AppError");
const Plan = require("../models/plan.model");

/**
 * @param {integer autoIncrement} planId
 * @param {text} description
 * @param {integer} price
 * @param {integer} period
 */

async function _createNewPlan({ description, price, period }) {
  const result = await Plan.create({ description, price, period }).catch(
    (e) => {
      throw new AppError(e.message, 500, "createNewPlan[service]", false, e);
    }
  );

  return result == undefined ? null : result;
}

async function _getPlanById(planId) {
  const result = await Plan.findOne({ where: { planId } }).catch((e) => {
    throw new AppError(e.message, 500, "getPlanbyId[service]", false, e);
  });

  return result == undefined ? null : result;
}

module.exports = {
  _createNewPlan,
  _getPlanById,
};
