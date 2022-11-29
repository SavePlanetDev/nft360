const express = require("express");
const router = express.Router();
const { getAllMembers } = require("../../controllers/member.controller");
const {
  createNewMember,
} = require("../../controllers/aggregates/register.controller");

const { getProfileById } = require("../../controllers/profile.controller");

router.get("/all", getAllMembers);
router.get("/profile/:userId", getProfileById);
router.post("/register", createNewMember);

module.exports = router;
