## Muse Backend Starter Code

This app is starter app is based on the [Deere Project 4 Starter Code](https://github.com/marcwright/deere-project4-express-api-starter)

This app serves JSON data only. There are no views. You'll build a React app to communicate with this Express app. Since there are no views, you'll want to use Postman to test that your endpoints are working before writing the React code.

Note - this starter app has no views and each endpoint is prefaced with `/api`.

```js
// server.js
app.use("/api/auth", require("./controllers/authController.js"));
app.use("/api/users", require("./controllers/usersController.js"));
```

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

1. Sequelize is included in the app. You have a `User` model. Run `db:migrate` to create the `Users` table in your database.

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

## Generate `Song`, `Artist` , and `UserArtist` Models

This is the ERD for what we'll build.

![](https://i.imgur.com/wEBgHJe.jpg)

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
      Artist.hasMany(models.Song, { foreignKey: "songId" });
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

## Additional Resources

- [Fruit App Solution](https://git.generalassemb.ly/jdr-0622/fruit-app-in-class)
- [Pokemon Express Solution](https://git.generalassemb.ly/jdr-0622/pokemon-express-sequelize6)
- [Google Routes Spreadsheet](https://docs.google.com/spreadsheets/d/14-LHKXLtEkp_vKEz3qSKjREnrmSyzQ9fimTlmrPsZsQ/edit#gid=0)
- [JSON Web Tokens](https://jwt.io/)

```

```
