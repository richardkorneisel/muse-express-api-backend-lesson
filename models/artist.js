"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Artist.hasMany(models.Song, { foreignKey: "songId" });
      Artist.belongsToMany(models.User, {
        through: "UserArtist",
        foreignKey: "artistId",
        otherKey: "userId",
      });
    }
  }
  Artist.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Artist",
    }
  );
  return Artist;
};
