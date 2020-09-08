const express = require("express");
const router = express.Router();

const UserModel = require("../models").User;
const ArtistModel = require("../models").Artist;
const SongModel = require("../models").Song;

// CREATE A NEW SONG FOR AN ARTIST
router.post("/:id/newsong", async (req, res) => {
  let artist = await ArtistModel.findByPk(req.params.id);
  let song = await artist.createSong(req.body);
  res.json({ artist, song });
});

// GET ARTIST PROFILE
router.get("/profile/:id", async (req, res) => {
  let artist = await ArtistModel.findByPk(req.params.id, {
    include: [{ model: UserModel, attributes: ["id", "name"] }],
  });
  res.json({ artist });
});

// GET ALL ARTISTS
router.get("/", async (req, res) => {
  let allArtists = await ArtistModel.findAll({ include: SongModel });
  res.json({ allArtists });
});

// CREATE A NEW ARTIST
router.post("/", async (req, res) => {
  let newArtist = await ArtistModel.create(req.body);
  res.json({ newArtist });
});

// UPDATE A ARTIST
router.put("/:id", async (req, res) => {
  let updatedArtist = await ArtistModel.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  });
  let artist = await ArtistModel.findByPk(req.params.id, {
    include: [{ model: UserModel, attributes: ["id", "name"] }],
  });
  res.json({ artist });
});

// DELETE A ARTIST
router.delete("/:id", async (req, res) => {
  await ArtistModel.destroy({
    where: { id: req.params.id },
  });
  res.json({
    message: `Artist with id ${req.params.id} was deleted`,
  });
});

module.exports = router;
