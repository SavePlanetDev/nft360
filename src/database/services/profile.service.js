const AppError = require("../../utils/AppError");
const Profile = require("../models/profile.model");

async function _createNewProfile({
  userId,
  subscriptionId,
  nftOwned = 0,
  collectionOwned = 0,
  totalValue = 0,
  pl24hr = 0,
  pl7d = 0,
  favorite = [],
}) {
  const [result, created] = await Profile.findOrCreate({
    where: { userId },
    defaults: {
      userId: userId,
      subscriptionId: subscriptionId,
      nftOwned: nftOwned,
      collectionOwned: collectionOwned,
      totalValue: totalValue,
      pl24hr: pl24hr,
      pl7d: pl7d,
      favorite: favorite,
    },
  }).catch((e) => {
    throw new AppError(e.message, 500, "createNewProfile", false, e);
  });

  return !created ? null : result;
}

async function _getProfileById(userId) {
  const result = await Profile.findOne({ where: { userId } }).catch((e) => {
    throw new AppError(e.message, 500, "getProfileById[service]", false, e);
  });

  return result == undefined ? null : result;
}

module.exports = {
  _createNewProfile,
  _getProfileById,
};
