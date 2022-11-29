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

async function createNewMember({
  userId,
  username,
  firstname,
  lastname,
  email,
  walletaddress,
  tel,
  subscriptionId,
}) {
  console.log({
    userId,
    username,
    firstname,
    lastname,
    email,
    walletaddress,
    tel,
    subscriptionId,
  });
  const result = await Register.findOrCreate({
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
  }).catch((error) => console.log(error));

  console.log("OK: ", result);
}

createNewMember({
  userId: "123455",
  username: "nonthasak",
  firstname: "nonthasak",
  lastname: "lao",
  email: "nonthasak.l@email.com",
  walletaddress: "0x1123500qdfal43184uss",
  tel: 0929931145,
  subscriptionId: 1,
});
