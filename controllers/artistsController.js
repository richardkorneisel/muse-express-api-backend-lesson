const express = require("express");
const router = express.Router();

const UserModel = require("../models").User;
const ArtistModel = require("../models").Artist;

// GET ARTIST PROFILE
router.get("/profile/:id", (req, res) => {
  ArtistModel.findByPk(req.params.id, {
    include: [
      {
        model: UserModel,
        attributes: ["id", "name"],
      },
    ],
  }).then((artistProfile) => {
    res.json({
      artist: artistProfile,
    });
  });
});

// GET ALL ARTISTS
router.get("/", (req, res) => {
  ArtistModel.findAll().then((allArtists) => {
    res.json({
      artists: allArtists,
    });
  });
});

// CREATE A NEW ARTIST
router.post("/", (req, res) => {
  ArtistModel.create(req.body).then((newArtist) => {
    res.json({
      artist: newArtist,
    });
  });
});

// UPDATE A ARTIST
router.put("/:id", (req, res) => {
  ArtistModel.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  }).then((updatedArtist) => {
    res.json({
      artist: updatedArtist,
    });
  });
});

// DELETE A ARTIST
router.delete("/:id", (req, res) => {
  ArtistModel.destroy({
    where: { id: req.params.id },
  }).then(() => {
    res.json({
      message: `Artist with id ${req.params.id} was deleted`,
    });
  });
});

module.exports = router;
