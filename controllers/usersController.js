const express = require("express");
const router = express.Router();

const UserModel = require("../models").User;
const ArtistModel = require("../models").Artist;

// GET USER PROFILE
router.get("/profile/:id", (req, res) => {
  UserModel.findByPk(req.params.id, { include: ArtistModel }).then(
    (userProfile) => {
      res.json({
        user: userProfile,
      });
    }
  );
});

// GET ALL USERS
router.get("/", (req, res) => {
  UserModel.findAll().then((allUsers) => {
    res.json({
      users: allUsers,
    });
  });
});

// CREATE A NEW USER
router.post("/", (req, res) => {
  UserModel.create(req.body).then((newUser) => {
    res.json({
      user: newUser,
    });
  });
});

// UPDATE A USER
router.put("/:id", (req, res) => {
  UserModel.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  }).then((updatedUser) => {
    res.json({
      user: updatedUser,
    });
  });
});

// DELETE A USER
router.delete("/:id", (req, res) => {
  UserModel.destroy({
    where: { id: req.params.id },
  }).then(() => {
    res.json({
      message: `User with id ${req.params.id} was deleted`,
    });
  });
});

module.exports = router;
