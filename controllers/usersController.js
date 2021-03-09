const express = require("express");
const router = express.Router();

const UserModel = require("../models").User;
const ArtistModel = require("../models").Artist;

// GET USER PROFILE
router.get("/profile/:id", async (req, res) => {
  let user = await UserModel.findByPk(req.params.id, {
    include: ArtistModel,
  });
  res.json({ user });
});


module.exports = router;
