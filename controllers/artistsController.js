const express = require("express");
const router = express.Router();

const UserModel = require("../models").User;
const ArtistModel = require("../models").Artist;
const SongModel = require("../models").Song;

// GET ARTISTS PROFILE
router.get("/profile/:id", async (req, res) => {
    let artist = await ArtistModel.findByPk(req.params.id, {
      include: [{model: UserModel, attributes: ["id", "name"]}],
    });
    res.json({ artist });
  });

// GET ALL ARTISTS
router.get("/", async (req, res) => {
    let artists = await ArtistModel.findAll({ include: SongModel });
    res.json({ artists });
  });

// CREATE A NEW ARTIST
router.post("/", async (req, res) => {
    let artist = await ArtistModel.create(req.body);
    res.json({ artist });
  });

// UPDATE AN ARTIST
router.put("/:id", async (req, res) => {
    let artist = await ArtistModel.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.json({ artist });
  });

// DELETE AN ARTIST
router.delete("/:id", async (req, res) => {
    await ArtistModel.destroy({
      where: { id: req.params.id },
    });
    res.json({
      message: `Artist with id ${req.params.id} was deleted`,
    });
  }); 
  
// ADD A NEW SONG
router.post("/:id/newsong", async (req, res) => {
    let artist = await ArtistModel.findByPk(req.params.id);
    let song = await artist.createSong(req.body);
    //Foo.hasMany(Bar)
    // await foo.createBar({ name: 'yet-another-bar' });
    res.json({ artist, song } );
  });
module.exports = router;

