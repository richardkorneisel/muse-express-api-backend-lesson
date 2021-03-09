## Muse Backend Starter Code

This app is starter app is based on the [Deere Project 4 Starter Code](https://github.com/marcwright/deere-project4-express-api-starter)

This app serves JSON data only. There are no views. You'll build a React app to communicate with this Express app. Since there are no views, you'll want to use Postman to test that your endpoints are working before writing the React code.

Note - this starter app has no views and each endpoint is prefaced with `/api`.

```js
// server.js
app.use("/api/auth", require("./controllers/authController.js"));
app.use("/api/users", require("./controllers/usersController.js"));
```

<br>

## Our goal

- [Heroku Muse Express API Backend](https://muse-backend.herokuapp.com/)
- [Heroku Muse React Frontend](https://muse-react-frontend.herokuapp.com/)
<<<<<<< HEAD
- The completed code is on a `solution` branch in this repo
=======
- [The completed code is on a solution branch in this repo](https://github.com/marcwright/muse-backend/tree/solution)
>>>>>>> solution

<br>

## Why build an API only backend app?

  - Modular, easier to spin up a new instance on AWS/Azure if the server goes down or if you need more bandwidth.
  - Difficult if not impossible to build ejs static views for every type of device (Desktop, iphone, android, etc). It's better to just serve the data and let other front-end applications consume the data.

<br>

#### API Endpoints - `usersController`
<<<<<<< HEAD

- `GET` - `localhost:3000/api/users/profile/:id`
- `GET` - `localhost:3000/api/users`
- `POST` - `localhost:3000/api/users`
- `PUT` - `localhost:3000/api/users/:id`
- `DELETE` - `localhost:3000/api/users/:id`

#### API Endpoints - `artistsController`

- `GET` - `localhost:3000/api/artists/profile/:id`
- `GET` - `localhost:3000/api/artists`
- `POST` - `localhost:3000/api/artists`
- `PUT` - `localhost:3000/api/artists/:id`
- `DELETE` - `localhost:3000/api/artists/:id`
- `POST` - `localhost:3000/api/artists/:id/newsong`

=======

- `GET` - `localhost:3000/api/users/profile/:id`
- `GET` - `localhost:3000/api/users`
- `POST` - `localhost:3000/api/users`
- `PUT` - `localhost:3000/api/users/:id`
- `DELETE` - `localhost:3000/api/users/:id`

#### API Endpoints - `artistsController`

- `GET` - `localhost:3000/api/artists/profile/:id`
- `GET` - `localhost:3000/api/artists`
- `POST` - `localhost:3000/api/artists`
- `PUT` - `localhost:3000/api/artists/:id`
- `DELETE` - `localhost:3000/api/artists/:id`
- `POST` - `localhost:3000/api/artists/:id/newsong`

>>>>>>> solution
<br>

## Set Up

1. Fork and clone this repo
1. `cd` into the folder and run `npm install`
1. In the root of your app, `touch .env` and add:

   ```bash
   PORT=3000
   JWT_SECRET=pancakes
   ```

1. Check out your `config/config.json` file. You'll need to create a database called `muse_development` in pgAdmin or from any directory in the Terminal:

   ```
   $ createdb muse_development
   ```

<<<<<<< HEAD
1. Sequelize is included in the app. You have a `User` model. Run `npx sequelize db:migrate` to create the `Users` table in your database.
=======
1. Sequelize is included in the app. You have a `User` model. Run `db:migrate` to create the `Users` table in your database.
>>>>>>> solution

1. Run `nodemon`.
1. Open Postman to confirm that your app is working on `localhost:3000/`.

![](https://i.imgur.com/VEkRBk9.png)

<br>

## Routes

You have the following routes available.

#### `server.js`

- GET `localhost:3000/`

#### `controllers/authController.js`

- POST `localhost:3000/api/auth/signup`
- POST `localhost:3000/api/auth/login`
- GET `localhost:3000/api/auth/logout`

#### `controllers/usersController.js`

- GET `localhost:3000/api/users/profile/:id`

<br>

## Generate `Song`, `Artist` , and `UserArtists` Models

This is the ERD for what we'll build.

![](https://i.imgur.com/M8OTXsv.jpg)

We'll need 4 tables:

1. Users (provided)
1. Artist Model

   ```js
   npx sequelize model:generate --name Artist --attributes name:string
   ```

1. Song Model

   ```js
   npx sequelize model:generate --name Song --attributes title:string,artistId:integer
   ```

1. Join Table to associate Users and Artists. This will create a table named `UserArtists`.

   ```js
   npx sequelize model:generate --name UserArtist --attributes userId:integer,artistId:integer
   ```

1. Before running `npx sequelize db:migrate`, update the migration files. Go back and add `defaultValue: new Date()` to the timestamps and `allowNull: false` to the `name` fields. Also, Add `allowNull: false` to the columns in the UserArtists migration file.

1. Run `npx sequelize db:migrate`

1. You should see the following in pgAdmin:

   ![](https://i.imgur.com/W0JGXV4.png)

<br>

## Set up Associations based on the ERD.

1. `models/Artist.js`

   ```js
   static associate(models) {
<<<<<<< HEAD
      Artist.hasMany(models.Song, { foreignKey: "artistId" });
=======
      Artist.hasMany(models.Song, { foreignKey: "songId" });
>>>>>>> solution
      Artist.belongsToMany(models.User, {
        through: "UserArtist",
        foreignKey: "artistId",
        otherKey: "userId",
      });
    }
   ```

1. `models/Song.js`

   ```js
    static associate(models) {
      Song.belongsTo(models.Artist, { foreignKey: "artistId" });
    }
   ```

1. `models/User.js`

   ```js
    static associate(models) {
      User.belongsToMany(models.Artist, {
        through: "UserArtist",
        foreignKey: "userId",
        otherKey: "artistId",
      });
    }
   ```

<br>

## Seed some data

1. You may want to do this in seperate files, but we'll do it live. `npx sequelize seed:generate --name demo-artist-user-songs`
1. Add some data:

   ```js
   "use strict";

   module.exports = {
     up: async (queryInterface, Sequelize) => {
       let artists = await queryInterface.bulkInsert("Artists", [
         { name: "The Beatles" },
         { name: "Rihanna" },
       ]);

       let songs = await queryInterface.bulkInsert("Songs", [
         { title: "Help!", artistId: 1 },
         { title: "Work", artistId: 2 },
       ]);

       let users = await queryInterface.bulkInsert("Users", [
         { name: "Marc" },
         { name: "Diesel" },
       ]);

       let userArtists = await queryInterface.bulkInsert("UserArtists", [
         { userId: 1, artistId: 1 },
         { userId: 2, artistId: 2 },
       ]);
     },

     down: async (queryInterface, Sequelize) => {},
   };
   ```

1. Run the seeds: `npx sequelize db:seed:all`

<br>

## Create some User routes

1. `GET` - `localhost:3000/api/users/profile/:id` will return JSON for a user's profile. We're provided a profile route, but let's also return a user's favorite artists also.

   ```js
<<<<<<< HEAD
    // MAKE SURE TO REQUIRE THE SEQUELIZE ARTIST MODEL AT THE TOP...

    const UserModel = require("../models").User;
    const ArtistModel = require("../models").Artist; 
   ```

   ```js
=======
>>>>>>> solution
   // GET USER PROFILE
   router.get("/profile/:id", async (req, res) => {
     let user = await UserModel.findByPk(req.params.id, {
       include: ArtistModel,
     });
     res.json({ user });
   });
   ```

   ![](https://i.imgur.com/xHLcTkx.png)

2. `GET` - `localhost:3000/api/users` will return all users with their songs

   ```js
   // GET ALL USERS
   router.get("/", async (req, res) => {
     let users = await UserModel.findAll();
     res.json({ users });
   });
   ```

   ![](https://i.imgur.com/v4EV6cR.png)

3. `POST` - `localhost:3000/api/users` will create a new user. VERY IMPORTANT, in Postman...

   - Make sure you're sending a `POST` request
   - Make sure the `Body` of your request is set to `raw` `JSON`. This is how React will send data to the backend.
   - Make sure your object keys are in quotes
   - Check the screenshot below for an example

   ```js
   // CREATE A NEW USER
   router.post("/", async (req, res) => {
     let user = await UserModel.create(req.body);
     res.json({ user });
   });
   ```

   ![](https://i.imgur.com/i8mOSr3.png)

4. `PUT` - `localhost:3000/api/users/:id` will update an existing user. VERY IMPORTANT, in Postman...

   - Make sure you're sending a `PUT` request
   - Make sure the `Body` of your request is set to `raw` `JSON`. This is how React will send data to the backend.
   - Make sure your object keys are in quotes
   - Note, any keys that aren't sent in `req.body` won't be changed
   - Check the screenshot below for an example

   ```js
   // UPDATE A USER
   router.put("/:id", async (req, res) => {
     let user = await UserModel.update(req.body, {
       where: { id: req.params.id },
       returning: true,
     });
     res.json({ user });
   });
   ```

   ![](https://i.imgur.com/uapioip.png)

5. `DELETE` - `localhost:3000/api/users/:id` will delete a user. VERY IMPORTANT, in Postman...

   - Make sure you're sending a `DELETE` request
   - Check the screenshot below for an example

   ```js
   // DELETE A USER
   router.delete("/:id", async (req, res) => {
     await UserModel.destroy({
       where: { id: req.params.id },
     });
     res.json({
       message: `User with id ${req.params.id} was deleted`,
     });
   });
   ```

   ![](https://i.imgur.com/MugmtZ8.png)

<br>

## YOU DO: Create new song and Artist routes

<<<<<<< HEAD
1. Create a `controllers/artistsController.js` controller file.
2. `require` and `app.use()` the route in `server.js`
3. Build these 6 routes
=======
1. Create an `controllers/artistsController.js` controller file.
2. `require` and `app.use()` the route in `server.js`
3. Build these 5 routes
>>>>>>> solution

   - `GET` - `localhost:3000/api/artists/profile/:id`
     - This route should return the users that favorited an Artist
     - Inside of `include` see if you can only return the `name` and `id` `attributes` for a UserModel
   - `GET` - `localhost:3000/api/artists`
   - `POST` - `localhost:3000/api/artists`
   - `PUT` - `localhost:3000/api/artists/:id`
   - `DELETE` - `localhost:3000/api/artists/:id`
   - `POST` - `localhost:3000/api/artists/:id/newsong`

     - This route should create a new song for an artist.
     - It will return the Artist and the New Song
<<<<<<< HEAD
     - - Check out the "Special methods/mixins added to instances" for a [bonus way to add a new Song to an Artist](https://sequelize.org/master/manual/assocs.html)
=======
     - Check out the "Special methods/mixins added to instances" for a [bonus way to add a new Song to an Artist](https://sequelize.org/master/manual/assocs.html)
>>>>>>> solution

     ![](https://i.imgur.com/nBGNf0c.png)

<details>
   <summary>artistsController file</summary>

```js
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
    include: SongModel,
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
```

</details>

<br>

## Heroku Deployment

<<<<<<< HEAD
- [node-express-heroku-deployment](https://git.generalassemb.ly/JDR-09-22/node-express-heroku-deployment?organization=JDR-09-22)
=======
- [node-express-heroku-deployment](https://git.generalassemb.ly/jdr-0622/node-express-heroku-deployment)
>>>>>>> solution
- [Heroku Manage Config Variables](https://devcenter.heroku.com/articles/config-vars#managing-config-vars)

<br>

## Additional Resources

- [Fruit App Solution](https://git.generalassemb.ly/JDR-09-22/fruit-app-in-class)
- [Pokemon Express Solution](https://git.generalassemb.ly/JDR-09-22/pokemon-express-sequelize6)
- [Google Routes Spreadsheet](https://docs.google.com/spreadsheets/d/14-LHKXLtEkp_vKEz3qSKjREnrmSyzQ9fimTlmrPsZsQ/edit#gid=0)
- [JSON Web Tokens](https://jwt.io/)
